---
title: Warstwa sieciowa
description: Wprowadzenie do warstwy sieciowej Ethereum.
lang: pl
sidebarDepth: 2
---

Ethereum to sieć peer-to-peer z tysiącami węzłów, które muszą być w stanie komunikować się ze sobą przy użyciu ustandaryzowanych protokołów. „Warstwa sieciowa” jest stosem protokołów, które umożliwiają tym węzłom znajdować się i wymieniać informacje. Obejmuje to „plotkowanie” informacji (komunikacja jeden do wielu) w sieci, jak również wymienianie żądań oraz odpowiedzi pomiędzy określonymi węzłami (komunikacja jeden do jednego). Każdy węzeł musi przestrzegać określonych zasad sieciowych, aby zapewnić wysyłanie i odbieranie prawidłowych informacji.

Istnieją dwie części oprogramowania klienta (klienty wykonawcze i klienty konsensusu), oba ze swoim własnym stosem sieciowym. Oprócz komunikacji z innymi węzłami Ethereum, klienty wykonawcze i konsensusu muszą się również komunikować ze sobą. Ta strona zawiera wstępne wyjaśnienie protokołów, które umożliwiają tę komunikację.

Klienty wykonawcze plotkują transakcje po sieci peer-to-peer warstwy wykonawczej. Wymaga to szyfrowanej komunikacji między uwierzytelnionymi rówieśnikami. Kiedy walidator zostanie wybrany do proponowania bloku, transakcje z lokalnej puli transakcji węzła zostaną przesłane do klienta konsensusu za pomocą lokalnego połączenia RPC, które zostaną spakowane w bloki śledzące. Klienty konsensusu następnie rozplotkują bloki śledzące w swojej sieci P2P. To wymaga dwóch osobnych sieci P2P: jednej łączącej klienty wykonawcze do plotkowania transakcji i jednej łączącej klienty konsensusu do plotkowania bloku.

## Wymagania wstępne {#prerequisites}

Pewna wiedza na temat [węzłów i klientów](/developers/docs/nodes-and-clients/) Ethereum będzie pomocna w zrozumieniu tej strony.

## Warstwa wykonawcza {#execution-layer}

Protokoły sieciowe warstwy wykonawczej są podzielone na dwa stosy:

- stos odkrywania: zbudowany na bazie UDP, umożliwia nowemu węzłowi znalezienie rówieśników, z którymi może się połączyć

- stos DevP2P: oparty na TCP, umożliwia węzłom wymianę informacji

Oba stosy działają równoległe. Stos odkrywania wprowadza nowych uczestników sieci do sieci, a stos DevP2P umożliwia ich interakcje.

### Odkrywanie {#discovery}

Odkrywanie to proces znajdowania innych węzłów w sieci. Jest to inicjowane za pomocą małego zestawu bootnode'ów (węzłów, których adresy są [zakodowane na stałe](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) w kliencie, aby można je było natychmiast znaleźć i połączyć klienta z peerami). Te węzły rozruchowe istnieją tylko po to, aby wprowadzić nowy węzeł do zbioru rówieśników — jest to ich jedyny cel, nie uczestniczą w normalnych zadaniach klienta takich jak synchronizacja z łańcuchem, oraz są używane tylko przy pierwszym uruchomieniu klienta.

Protokół używany do interakcji między węzłami a bootnode'ami to zmodyfikowana forma protokołu [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), która wykorzystuje [rozproszoną tablicę haszującą](https://en.wikipedia.org/wiki/Distributed_hash_table) do udostępniania list węzłów. Każdy węzeł ma własną wersję tej tablicy zwierającą informacje wymagane do połączenia się z jego najbliższym rówieśnikiem. Ta „bliskość” nie jest geograficzna — odległość określana jest poprzez podobieństwo identyfikatora węzła. Tablica każdego węzła jest regularnie odświeżana, jako funkcja bezpieczeństwa. Na przykład w protokole odkrywania [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), węzły mogą również wysyłać „ogłoszenia”, które wyświetlają podprotokoły obsługiwane przez klienta, pozwalając peerom negocjować protokoły, których obie strony mogą używać do komunikacji.

Odkrywanie zaczyna się grą w PING-PONG. Pomyślny PING-PONG „wiąże” nowy węzeł z węzłem rozruchowym. Początkowym komunikatem, który informuje bootnode'a o istnieniu nowego węzła wchodzącego do sieci, jest `PING`. Ten `PING` zawiera zhaszowane informacje o nowym węźle, bootnodzie i znacznik czasu wygaśnięcia. Bootnode odbiera `PING` i zwraca `PONG` zawierający hasz `PING`. Jeśli hasze `PING` i `PONG` są zgodne, połączenie między nowym węzłem a bootnode'em jest weryfikowane i mówi się, że zostały "powiązane".

Po powiązaniu nowy węzeł może wysłać żądanie `FIND-NEIGHBOURS` do bootnode'a. Dane zwracane przez węzeł rozruchowy zawierają listę rówieśników, do których może się połączyć nowy węzeł. Jeśli węzły nie są powiązane, żądanie `FIND-NEIGHBOURS` zakończy się niepowodzeniem, więc nowy węzeł nie będzie mógł dołączyć do sieci.

Po otrzymaniu przez nowy węzeł listy sąsiadów od węzła rozruchowego rozpoczyna on z każdym z nich wymianę PING-PONG. Pomyślne PING-PONGi wiążą nowy węzeł z jego sąsiadami, umożliwiając wymianę wiadomości.

```
uruchom klienta --> połącz z bootnode'em --> powiąż z bootnode'em --> znajdź sąsiadów --> powiąż z sąsiadami
```

Klienci wykonawczy obecnie używają protokołu odkrywania [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) i trwają aktywne prace nad migracją do protokołu [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Rekordy węzłów Ethereum {#enr}

[Rekord węzła Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) to obiekt, który zawiera trzy podstawowe elementy: podpis (hasz zawartości rekordu utworzony zgodnie z ustalonym schematem tożsamości), numer sekwencyjny śledzący zmiany w rekordzie oraz dowolną listę par klucz:wartość. Jest to format odporny na zmiany w przyszłości, który umożliwia łatwiejszą wymianę informacji identyfikacyjnych między nowymi peerami i jest preferowanym formatem [adresu sieciowego](/developers/docs/networking-layer/network-addresses) dla węzłów Ethereum.

#### Dlaczego odkrywanie opiera się na UDP? {#why-udp}

UDP nie umożliwia żadnego sprawdzania błędów, ponownego przesyłania błędnych pakietów ani dynamicznego otwierania i zamykania połączeń — zamiast tego wysyła po prostu ciągły strumień informacji do celu, bez względu na to, czy zostaną one poprawnie odebrane. Ta minimalna funkcjonalność oznacza również minimalne obciążenie, co sprawia, że połączenie to jest bardzo szybkie. Do odkrywania, gdzie węzeł po prostu chce powiadomić o swoim istnieniu, aby następnie nawiązać formalne połączenie z rówieśnikiem, UDP jest wystarczające. Jednak dla reszty stosu sieciowego, UDP nie nadaje się tego celu. Wymiana informacji pomiędzy węzłami jest dość złożona, a więc wymaga bardziej funkcjonalnego protokołu, który umożliwia ponowne wysyłanie, sprawdzanie błędów itp. Dodatkowe obciążenia związane z TCP warte są dodatkowych funkcji. Dlatego też większość stosu P2P działa na TCP.

### DevP2P {#devp2p}

DevP2P sam w sobie jest całym stosem protokołów, które implementuje Ethereum w celu ustanowienia i utrzymania sieci peer-to-peer. Gdy nowe węzły dołączą do sieci, ich interakcje są regulowane przez protokoły ze stosu [DevP2P](https://github.com/ethereum/devp2p). Wszystkie opierają się na TCP i obejmują protokół transportowy RLPx, protokół przewodowy i szereg podprotokołów. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) to protokół zarządzający inicjowaniem, uwierzytelnianiem i utrzymywaniem sesji między węzłami. RLPx koduje wiadomości przy użyciu RLP (prefiks o rekursywnej długości), który jest bardzo oszczędzającą pamięć metodą kodowania danych w minimalne struktury do wysyłania pomiędzy węzłami.

Sesja RLPx między dwoma węzłami rozpoczyna się od początkowego kryptograficznego uścisku dłoni. Oznacza to wysłanie przez węzeł wiadomości uwierzytelniającej, która następnie zostaje zweryfikowana przez rówieśnika. Po pomyślnej weryfikacji rówieśnik generuje wiadomość o potwierdzeniu uwierzytelnienia, którą następnie odsyła do węzła inicjującego. Jest to proces wymiany kluczy, który umożliwia węzłom na prywatne i bezpieczne komunikowanie się. Pomyślny kryptograficzny uścisk dłoni powoduje następnie, że oba węzły wysyłają do siebie wiadomość „hello” „po przewodzie”. Protokół przewodowy jest inicjowany przez pomyślną wymianę wiadomości „hello”.

Wiadomości „hello” zawierają:

- wersję protokołu
- identyfikator klienta
- port
- identyfikator węzła
- listę obsługiwanych podprotokołów

Są to informacje potrzebne do pomyślnej interakcji, ponieważ określają jakie możliwości są współdzielone przez oba węzły oraz konfigurują komunikację. Istnieje proces negocjacji podprotokołów, w którym listy podprotokołów obsługiwanych przez każdy węzeł są porównywane, a te, które są wspólne dla obu węzłów, mogą zostać wykorzystane w sesji.

Oprócz wiadomości „hello” protokół przewodowy może również wysyłać wiadomość „disconnect”, która ostrzega rówieśnika, że połączenie zostanie zamknięte. Protokół przewodowy zawiera również wiadomości PING i PONG, które są okresowo wysyłane w celu utrzymania otwartej sesji. Wymiany protokołów RLPx i przewodowego ustanawiają zatem podstawy komunikacji między węzłami, zapewniając strukturę do wymiany użytecznych informacji zgodnie z określonym podprotokołem.

### Podprotokoły {#sub-protocols}

#### Protokół komunikacyjny {#wire-protocol}

Po połączeniu się rówieśników i rozpoczęciu sesji RLPx protokół przewodowy określa, w jaki sposób komunikują się rówieśnicy. Początkowo protokół przewodowy określał trzy główne zadania: synchronizacje łańcucha, propagację bloku i wymianę transakcji. Jednak kiedy Ethereum przeszło na proof-of-stake, propagowanie bloku i synchronizowanie łańcucha stało się częścią warstwy konsensusu. Wymiana transakcji nadal pozostaje zadaniem klientów wykonawczych. Wymiana transakcji odnosi się do wymiany oczekujących transakcji między węzłami tak, aby twórcy bloków mogli wybrać niektóre i uwzględnić je w następnym bloku. Szczegółowe informacje o tych zadaniach są dostępne [tutaj](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klienci, którzy obsługują te podprotokoły, udostępniają je za pośrednictwem [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (podprotokół lekkiego Ethereum) {#les}

Jest to minimalny protiokół do synchronizowania lekkich klientów. Protokół ten był rzadko używany, ponieważ od pełnych węzłów wymaga się dostarczania danych do lekkich klientów bez żadnych zachęt. Domyślnym zachowaniem klientów wykonawczych jest niedostarczanie danych lekkim klientom poprzez les. Więcej informacji jest dostępnych w [specyfikacji](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Protokół snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) to opcjonalne rozszerzenie, które pozwala peerom na wymianę migawek ostatnich stanów, co umożliwia im weryfikację danych konta i pamięci masowej bez konieczności pobierania pośrednich węzłów drzewa Merkle trie.

#### Wit (protokół świadka) {#wit}

[Protokół świadka](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) to opcjonalne rozszerzenie, które umożliwia wymianę świadectw stanu między peerami, pomagając w synchronizacji klientów z końcówką łańcucha.

#### Whisper {#whisper}

Whisper był protokołem, który miał na celu umożliwienie bezpiecznego przesyłania wiadomości pomiędzy rówieśnikami bez zapisywania żadnych informacji w blockchainie. Był on częścią protokołu przewodowego DevP2P, ale obecnie jest wycofany. Istnieją również inne [powiązane projekty](https://wakunetwork.com/) o podobnych celach.

## Warstwa konsensusu {#consensus-layer}

Klienty konsensusu uczestniczą w osobnej sieci peer-to-peer z inną specyfikacją. Klienty konsensusu muszą uczestniczyć w plotkowaniu bloku, tak aby mogły otrzymać nowe bloki od rówieśników i rozgłaszać je, gdy najdzie ich kolej na bycie proponentem bloku. Podobnie jak w przypadku warstwy wykonawczej, wymaga to najpierw protokołu odkrywania, aby węzeł mógł znaleźć rówieśników i ustanowić bezpiecze sesje do wymiany bloków, poświadczeń itp.

### Odkrywanie {#consensus-discovery}

Podobnie jak klienci wykonawczy, klienci konsensusu używają protokołu [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) przez UDP do znajdowania peerów. Implementacja discv5 w warstwie konsensusu różni się od implementacji w klientach wykonawczych tylko tym, że zawiera adapter łączący discv5 ze stosem [libP2P](https://libp2p.io/), wycofując DevP2P. Sesje RLPx warstwy wykonawczej zostały porzucone na rzecz bezpiecznego kanału uścisku dłoni libP2P.

### ENR-y {#consensus-enr}

ENR dla węzłów konsensusu zawiera klucz publiczny węzła, adres IP, porty UDP i TCP oraz dwa pola specyficzne dla konsensusu: pole bitowe podsieci poświadczeń i klucz `eth2`. To pierwsze ułatwia węzłom znalezienie rówieśników uczestniczących w określonych podsieciach plotkujących poświadczenia. Klucz `eth2` zawiera informacje o tym, której wersji forka Ethereum używa węzeł, co zapewnia, że peery łączą się z właściwą siecią Ethereum.

### libP2P {#libp2p}

Stos libP2P obsługuje całą komunikację po odkrywaniu. Klienty mogą wybierać i nasłuchiwać na IPv4 i/lub IPv6 zgodnie z tym, jak to zostało określone w ich ENR. Protokoły w warstwie libP2P mogą zostać podzielone na domeny plotkujące i żądanie-odpowiedź.

### Gossip {#gossip}

Domena plotkująca zawiera wszystkie informacje, które muszą zostać szybko rozprzestrzenione w sieci. Wlicza się w to bloki śledzące, dowody, poświadczenia, wyjścia oraz odcięcia. Wszystko to przesyłane jest przy użyciu gossipsub v1 od libP2P i opiera się na różnych metadanych przechowywanych lokalnie w każdym węźle, wliczając w to maksymalny rozmiar ładunku plotkującego do odebrania i przesłania. Szczegółowe informacje o domenie gossip są dostępne [tutaj](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Żądanie-odpowiedź {#request-response}

Domena żądanie-odpowiedź zawiera protokoły dla klientów żądających specyficznych informacji od swoich rówieśników. Przykładem może być żądanie określonych bloków śledzących pasujących do określonych hashy korzeni lub znajdujących się w określonym zakresie slotów. Odpowiedzi są zawsze zwracane jako bajty zakodowane w formie SSZ i skompresowane przy użyciu Snappy.

## Dlaczego klient konsensusu preferuje SSZ zamiast RLP? {#ssz-vs-rlp}

SSZ to skrót od prostej serializacji. Wykorzystuje ona stałe przesunięcia, które ułatwiają dekodowanie indywidualnych części zakodowanej wiadomości bez potrzeby dekodowania całej struktury, co jest bardzo pomocne dla klienta konsensusu, ponieważ może efektywnie pobierać określone informacje z zakodowanej wiadomości. Został on również zaprojektowany specjalnie do integracji z protokołami Merkle, co przynosi korzyści w zakresie efektywności Merkleizacji. Ponieważ wszystkie hashe w warstwie konsensusu są korzeniami Merkle, przekłada się to na znaczącą poprawę. SSZ gwarantuje również unikalne reprezentacje wartości.

## Łączenie klientów wykonawczych i konsensusu {#connecting-clients}

Oba te klienty działają równoległe. Muszą być połączone, aby klient konsensusu mógł dostarczać instrukcje do klienta wykonawczego, a klient wykonawczy mógł przekazywać pakiety transakcji do klienta konsensusu, aby zostały uwzględnione w blokach śledzących. Ta komunikacja między dwoma klientami może zostać osiągnięta przy użyciu lokalnego połączenia RPC. API znane jako ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) definiuje instrukcje wysyłane między tymi dwoma klientami. Ponieważ oba klienty znajdują się za pojedynczą tożsamością sieciową, współdzielą ENR (Ethereum Node Record), który zawiera osobny klucz dla każdego klienta (klucz eth1 i klucz eth2).

Poniżej przedstawiono podsumowanie przepływu, z odpowiednim stosem sieciowym w nawiasach.

### Gdy klient konsensusu nie jest producentem bloku: {#when-consensus-client-is-not-block-producer}

- Klient konsensusu otrzymuje blok za pośrednictwem protokołu plotkowania bloku (konsensus p2p)
- Klient konsensusu wstępnie waliduje blok, tzn. upewnia się, że pochodzi on od prawidłowego nadawcy i zawiera poprawne metadane.
- Transakcje w bloku zostają wysłane do warstwy wykonawczej jako ładunek wykonawczy (lokalne połączenie RPC)
- Warstwa wykonawcza wykonuje transakcje i waliduje stan w nagłówku bloku (tzn. sprawdza, czy hasze się zgadzają).
- Warstwa wykonawcza przekazuje zweryfikowane dane z powrotem do warstwy konsensusu, blok uważany jest teraz za zweryfikowany (lokalne połączenie RPC)
- Warstwa konsensusu dodaje blok na początek swojego łańcucha i poświadcza go, rozgłaszając poświadczenie w sieci (konsensus p2p)

### Gdy klient konsensusu jest producentem bloku: {#when-consensus-client-is-block-producer}

- Klient konsensusu otrzymuje powiadomienie, że jest twórcą następnego bloku (konsensus p2p)
- Warstwa konsensusu wywołuje metodę `create block` w kliencie wykonawczym (lokalne RPC).
- Warstwa wykonawcza uzyskuje dostęp do pamięci puli transakcji, która została zapełniona przez protokół plotkowania transakcji (wykonawcze p2p)
- Klient wykonawczy łączy transakcje w blok, wykonuje transakcje i generuje hash bloku
- Klient konsensusu pobiera transakcje i hash bloku od klienta wykonawczego, a następnie dodaje je do bloku śledzącego (lokalne RPC)
- Klient konsensusu rozgłasza blok po protokole plotkowania bloku (konsensus p2p)
- Inne klienty otrzymują zaproponowany blok za pomocą protokołu plotkowania bloku i weryfikują go tak jak zostało to opisane powyżej (konsensus p2p)

Po poświadczeniu bloku przez wystarczającą liczbę walidatorów zostaje on dodany na początek łańcucha, uzasadniony i ostatecznie sfinalizowany.

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

Schemat warstwy sieciowej dla klientów konsensusu i wykonawczych, z [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Dalsza lektura {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Specyfikacje sieciowe warstwy konsensusu](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[kademlia do discv5](https://vac.dev/kademlia-to-discv5)
[Artykuł o kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Wprowadzenie do p2p Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Relacja eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Wideo ze szczegółami dotyczącymi The Merge i klienta eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
