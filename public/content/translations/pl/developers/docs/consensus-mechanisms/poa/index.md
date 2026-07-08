---
title: "Dowód autorytetu (PoA)"
description: "Wyjaśnienie protokołu konsensusu dowodu autorytetu i jego roli w ekosystemie blockchain."
lang: pl
---

**Dowód autorytetu (PoA)** to oparty na reputacji algorytm konsensusu, który jest zmodyfikowaną wersją [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/). Jest on najczęściej używany przez prywatne łańcuchy, sieci testowe i lokalne sieci deweloperskie. PoA to oparty na reputacji algorytm konsensusu, który wymaga zaufania do zestawu autoryzowanych podmiotów podpisujących w celu tworzenia bloków, zamiast mechanizmu opartego na stawce w PoS.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) oraz [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest dowód autorytetu (PoA)? {#what-is-poa}

Dowód autorytetu to zmodyfikowana wersja **[dowodu stawki](/developers/docs/consensus-mechanisms/pos/) (PoS)**, będąca algorytmem konsensusu opartym na reputacji, w przeciwieństwie do mechanizmu opartego na stawce w PoS. Termin ten został wprowadzony po raz pierwszy w 2017 roku przez Gavina Wooda, a ten algorytm konsensusu jest najczęściej używany przez prywatne łańcuchy, sieci testowe i lokalne sieci deweloperskie, ponieważ eliminuje potrzebę posiadania wysokiej jakości zasobów, jak ma to miejsce w przypadku dowodu pracy (PoW), oraz rozwiązuje problemy ze skalowalnością PoS poprzez posiadanie małego podzbioru węzłów przechowujących blockchain i tworzących bloki.

Dowód autorytetu wymaga zaufania do zestawu autoryzowanych podpisujących, którzy są określeni w [bloku genezy](/glossary/#genesis-block). W większości obecnych implementacji wszyscy autoryzowani podpisujący zachowują równą władzę i przywileje podczas ustalania konsensusu łańcucha. Ideą stakingu reputacji jest to, że każdy autoryzowany walidator jest dobrze znany wszystkim dzięki procedurom takim jak KYC (poznaj swojego klienta), lub poprzez to, że jedynym walidatorem jest dobrze znana organizacja — w ten sposób, jeśli walidator zrobi coś złego, jego tożsamość jest znana.

Istnieje wiele implementacji PoA, ale standardową implementacją Ethereum jest **clique**, która wdraża [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique to przyjazny dla deweloperów i łatwy do wdrożenia standard, obsługujący wszystkie typy synchronizacji klientów. Inne implementacje obejmują [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) oraz [Aura](https://openethereum.github.io/Chain-specification).

## Jak to działa {#how-it-works}

W PoA wybierany jest zestaw autoryzowanych podpisujących do tworzenia nowych bloków. Podpisujący są wybierani na podstawie ich reputacji i tylko oni mają prawo tworzyć nowe bloki. Podpisujący są wybierani w systemie round-robin (karuzelowym), a każdy z nich może utworzyć blok w określonym przedziale czasowym. Czas tworzenia bloku jest stały, a podpisujący są zobowiązani do utworzenia bloku w tym przedziale czasowym.

Reputacja w tym kontekście nie jest wartością wymierną, ale raczej reputacją dobrze znanych korporacji, takich jak Microsoft i Google. Dlatego sposób wyboru zaufanych podpisujących nie jest algorytmiczny, lecz opiera się na zwykłym ludzkim akcie _zaufania_. Przykładowo, jeśli podmiot taki jak Microsoft tworzy prywatną sieć PoA pomiędzy setkami lub tysiącami startupów i przyjmuje rolę jedynego zaufanego podpisującego (z możliwością dodania w przyszłości innych znanych podpisujących, takich jak Google), startupy bez wątpienia ufałyby, że Microsoft zawsze będzie działał uczciwie, i korzystałyby z tej sieci. Rozwiązuje to potrzebę stakowania w różnych małych/prywatnych sieciach, które zostały zbudowane w różnych celach, aby utrzymać je jako zdecentralizowane i funkcjonujące, a także eliminuje potrzebę posiadania górników, co zużywa dużo energii i zasobów. Niektóre prywatne sieci używają standardu PoA w jego oryginalnej formie, jak np. VeChain, a inne go modyfikują, jak Binance, które używa [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), będącego niestandardową, zmodyfikowaną wersją PoA i PoS.

Proces głosowania jest przeprowadzany przez samych podpisujących. Każdy podpisujący oddaje głos za dodaniem lub usunięciem podpisującego w swoim bloku podczas tworzenia nowego bloku. Głosy są zliczane przez węzły, a podpisujący są dodawani lub usuwani na podstawie głosów, które osiągną określony próg `SIGNER_LIMIT`.

Może dojść do sytuacji, w której wystąpią małe forki (rozgałęzienia); trudność bloku zależy od tego, czy blok został podpisany w swojej kolejności, czy poza nią. Bloki „w kolejności” (in turn) mają trudność 2, a bloki „poza kolejnością” (out of turn) mają trudność 1. W przypadku małych forków, łańcuch, w którym większość podpisujących pieczętuje bloki „w kolejności”, zgromadzi największą trudność i wygra.

## Wektory ataków {#attack-vectors}

### Złośliwi podpisujący {#malicious-signers}

Złośliwy użytkownik może zostać dodany do listy podpisujących lub klucz/maszyna do podpisywania może zostać skompromitowana. W takim scenariuszu protokół musi być w stanie obronić się przed reorganizacją łańcucha i spamowaniem. Proponowane rozwiązanie polega na tym, że przy liście N autoryzowanych podpisujących, każdy z nich może wybijać tylko 1 blok na każde K bloków. Zapewnia to ograniczenie szkód, a pozostali walidatorzy mogą przegłosować usunięcie złośliwego użytkownika.

### Cenzura {#censorship-attack}

Innym interesującym wektorem ataku jest sytuacja, w której podpisujący (lub grupa podpisujących) próbuje cenzurować bloki zawierające głosy za usunięciem ich z listy autoryzacji. Aby temu zaradzić, dozwolona częstotliwość wybijania przez podpisujących jest ograniczona do 1 na N/2. Gwarantuje to, że złośliwi podpisujący muszą kontrolować co najmniej 51% kont podpisujących, w którym to momencie staliby się oni de facto nowym źródłem prawdy dla łańcucha.

### Spam {#spam-attack}

Kolejnym drobnym wektorem ataku są złośliwi podpisujący, którzy wstrzykują nowe propozycje głosowania do każdego wybijanego przez siebie bloku. Ponieważ węzły muszą zliczać wszystkie głosy, aby utworzyć rzeczywistą listę autoryzowanych podpisujących, muszą one rejestrować wszystkie głosy w czasie. Bez nałożenia limitu na okno głosowania, mogłoby to rosnąć powoli, ale w sposób nieograniczony. Rozwiązaniem jest zastosowanie _przesuwnego_ okna W bloków, po którym głosy są uważane za nieaktualne. _Rozsądnym oknem mogą być 1-2 epoki._

### Bloki współbieżne {#concurrent-blocks}

W sieci PoA, gdy istnieje N autoryzowanych podpisujących, każdy z nich może wybijać 1 blok na K, co oznacza, że N-K+1 walidatorów może wybijać w dowolnym momencie. Aby zapobiec wyścigowi tych walidatorów o bloki, każdy podpisujący powinien dodać małe, losowe „przesunięcie” (offset) do czasu publikacji nowego bloku. Chociaż proces ten zapewnia, że małe forki są rzadkie, sporadyczne rozgałęzienia wciąż mogą się zdarzać, podobnie jak w sieci głównej. Jeśli okaże się, że podpisujący nadużywa swojej władzy i powoduje chaos, pozostali podpisujący mogą go przegłosować i usunąć.

Jeśli na przykład jest 10 autoryzowanych podpisujących, a każdy z nich może utworzyć 1 blok na 6, to w dowolnym momencie 5 walidatorów może tworzyć bloki. Aby zapobiec ich wyścigowi w tworzeniu bloków, każdy podpisujący dodaje małe, losowe „przesunięcie” do czasu publikacji nowego bloku. Zmniejsza to występowanie małych forków, ale nadal pozwala na sporadyczne rozgałęzienia, jak widać to w sieci głównej Ethereum. Jeśli podpisujący nadużyje swojego autorytetu i spowoduje zakłócenia, może zostać usunięty z sieci w drodze głosowania.

## Plusy i minusy {#pros-and-cons}

| Plusy                                                                                                                                                                     | Minusy                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bardziej skalowalny niż inne popularne mechanizmy, takie jak PoS i PoW, ponieważ opiera się na ograniczonej liczbie podpisujących bloki                                   | Sieci PoA zazwyczaj mają stosunkowo niewielką liczbę węzłów walidujących. Sprawia to, że sieć PoA jest bardziej scentralizowana.                                      |
| Blockchainy PoA są niezwykle tanie w utrzymaniu i działaniu                                                                                                               | Zostanie autoryzowanym podpisującym jest zazwyczaj poza zasięgiem zwykłego człowieka, ponieważ blockchain wymaga podmiotów o ugruntowanej reputacji.                  |
| Transakcje są potwierdzane bardzo szybko, czas ten może wynosić mniej niż 1 sekundę, ponieważ do walidacji nowych bloków wymagana jest tylko ograniczona liczba podpisujących | Złośliwi podpisujący mogą przeprowadzić reorganizację łańcucha, podwójne wydatkowanie lub cenzurować transakcje w sieci; ataki te są łagodzone, ale nadal możliwe |

## Dalsza lektura {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Standard Clique_
- [Badanie nad dowodem autorytetu](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kryptoekonomia_
- [Czym jest dowód autorytetu](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Wyjaśnienie dowodu autorytetu](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA w blockchainie](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Wyjaśnienie Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Przestarzałe PoA, specyfikacja Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, inna implementacja PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Wolisz uczyć się wzrokowo? {#visual-learner}

Obejrzyj wizualne wyjaśnienie dowodu autorytetu:

<VideoWatch slug="proof-of-authority-explained" />

## Powiązane tematy {#related-topics}

- [Dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)