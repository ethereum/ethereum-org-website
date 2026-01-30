---
title: Dowód autorytetu (PoA)
description: Wyjaśnienie protokołu konsensusu opartego na dowodzie autorytetu i jego roli w ekosystemie blockchain.
lang: pl
---

**Dowód autorytetu (PoA)** to algorytm konsensusu oparty na reputacji, który jest zmodyfikowaną wersją [dowodu stawki](/developers/docs/consensus-mechanisms/pos/). Jest on używany głównie przez prywatne łańcuchy, sieci testowe i lokalne sieci deweloperskie. PoA jest algorytmem konsensusu opartym na reputacji, który wymaga zaufania do zestawu autoryzowanych sygnatariuszy do tworzenia bloków, w przeciwieństwie do mechanizmu opartego na stawkach w PoS.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznanie się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) i [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest dowód autorytetu (PoA)? {#what-is-poa}

Dowód autorytetu jest zmodyfikowaną wersją **[dowodu stawki](/developers/docs/consensus-mechanisms/pos/) (PoS)**, który jest algorytmem konsensusu opartym na reputacji zamiast mechanizmu opartego na stawkach w PoS. Termin ten został po raz pierwszy wprowadzony w 2017 roku przez Gavina Wooda, a ten algorytm konsensusu jest używany głównie przez prywatne łańcuchy, sieci testowe i lokalne sieci deweloperskie, ponieważ eliminuje potrzebę posiadania wysokiej jakości zasobów, jak to ma miejsce w przypadku PoW, i przezwycięża problemy ze skalowalnością PoS, posiadając mały podzbiór węzłów przechowujących blockchain i produkujących bloki.

Dowód autorytetu wymaga zaufania do zestawu autoryzowanych sygnatariuszy, którzy są ustawieni w [bloku genezy](/glossary/#genesis-block). W większości obecnych implementacji wszyscy autoryzowani sygnatariusze zachowują równą władzę i przywileje przy określaniu konsensusu łańcucha. Ideą stakingu reputacji jest to, że każdy autoryzowany walidator jest dobrze znany wszystkim dzięki takim rzeczom jak „znaj swojego klienta” (KYC) lub dzięki temu, że jedynym walidatorem jest dobrze znana organizacja – w ten sposób, jeśli walidator zrobi coś złego, jego tożsamość jest znana.

Istnieje wiele implementacji PoA, ale standardową implementacją Ethereum jest **clique**, która implementuje [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique jest przyjazny dla deweloperów i łatwy do wdrożenia, obsługując wszystkie typy synchronizacji klientów. Inne implementacje to [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) i [Aura](https://openethereum.github.io/Chain-specification).

## Jak to działa {#how-it-works}

W PoA wybiera się zestaw autoryzowanych sygnatariuszy do tworzenia nowych bloków. Sygnatariusze są wybierani na podstawie swojej reputacji i są jedynymi, którzy mogą tworzyć nowe bloki. Sygnatariusze są wybierani w trybie okrężnym, a każdy z nich może utworzyć blok w określonych ramach czasowych. Czas tworzenia bloku jest stały, a sygnatariusze są zobowiązani do utworzenia bloku w tych ramach czasowych.

Reputacja w tym kontekście nie jest rzeczą wymierną, ale raczej reputacją znanych korporacji, takich jak Microsoft i Google. Stąd sposób wyboru zaufanych sygnatariuszy nie jest algorytmiczny, ale jest raczej normalnym ludzkim aktem _zaufania_, w którym podmiot, powiedzmy na przykład Microsoft, tworzy prywatną sieć PoA pomiędzy setkami lub tysiącami startupów i sam odgrywa rolę jedynego zaufanego sygnatariusza z możliwością dodania w przyszłości innych znanych sygnatariuszy, takich jak Google. Startupy bez wątpienia zaufałyby, że Microsoft będzie zawsze działał w uczciwy sposób i korzystał z sieci. Rozwiązuje to potrzebę stakowania w różnych małych/prywatnych sieciach, które zostały zbudowane w różnych celach, aby utrzymać je zdecentralizowane i działające, wraz z potrzebą górników, co zużywa dużo energii i zasobów. Niektóre prywatne sieci używają standardu PoA, takie jak VeChain, a niektóre go modyfikują, jak Binance, który używa [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), co jest niestandardową, zmodyfikowaną wersją PoA i PoS.

Proces głosowania jest przeprowadzany przez samych sygnatariuszy. Każdy sygnatariusz głosuje za dodaniem lub usunięciem sygnatariusza w swoim bloku podczas tworzenia nowego bloku. Głosy są podliczane przez węzły, a sygnatariusze są dodawani lub usuwani na podstawie głosów osiągających określony próg `SIGNER_LIMIT`.

Może wystąpić sytuacja, w której pojawią się małe forki. Trudność bloku zależy od tego, czy blok został podpisany w kolejce, czy poza nią. Bloki podpisane „w kolejce” mają trudność 2, a bloki podpisane „poza kolejką” mają trudność 1. W przypadku małych forków łańcuch z większością sygnatariuszy zatwierdzających bloki „w kolejce” zgromadzi największą trudność i wygra.

## Wektory ataków {#attack-vectors}

### Złośliwi sygnatariusze {#malicious-signers}

Złośliwy użytkownik może zostać dodany do listy sygnatariuszy, lub klucz/maszyna podpisująca może zostać przejęta. W takim scenariuszu protokół musi być w stanie obronić się przed reorganizacjami i spamem. Proponowanym rozwiązaniem jest to, że przy liście N autoryzowanych sygnatariuszy, każdy sygnatariusz może wybić tylko 1 blok na każde K bloków. Zapewnia to ograniczenie szkód, a pozostali walidatorzy mogą odwołać złośliwego użytkownika.

### Cenzura {#censorship-attack}

Innym interesującym wektorem ataku jest sytuacja, w której sygnatariusz (lub grupa sygnatariuszy) próbuje cenzurować bloki głosujące za usunięciem ich z listy autoryzacyjnej. Aby obejść ten problem, dozwolona częstotliwość bicia przez sygnatariuszy jest ograniczona do 1 z N/2. Zapewnia to, że złośliwi sygnatariusze muszą kontrolować co najmniej 51% kont podpisujących, w którym to momencie skutecznie staliby się nowym źródłem prawdy dla łańcucha.

### Spam {#spam-attack}

Innym niewielkim wektorem ataku jest wstrzykiwanie przez złośliwych sygnatariuszy nowych propozycji głosowania do każdego bloku, który wybijają. Ponieważ węzły muszą podliczać wszystkie głosy, aby stworzyć aktualną listę autoryzowanych sygnatariuszy, muszą rejestrować wszystkie głosy w czasie. Bez ograniczenia okna głosowania, mogłoby to rosnąć powoli, ale bez ograniczeń. Rozwiązaniem jest umieszczenie _ruchomego_ okna W bloków, po którym głosy są uważane za nieaktualne. _Rozsądnym oknem może być 1-2 epok._

### Bloki współbieżne {#concurrent-blocks}

W sieci PoA, gdy jest N autoryzowanych sygnatariuszy, każdy sygnatariusz może wybić 1 blok z K, co oznacza, że N-K+1 walidatorów może bić bloki w dowolnym momencie. Aby zapobiec wyścigowi tych walidatorów o bloki, każdy sygnatariusz powinien dodać mały losowy „offset” do czasu, w którym wydaje nowy blok. Chociaż ten proces zapewnia, że małe forki są rzadkie, sporadyczne forki mogą się nadal zdarzać, tak jak w sieci głównej. Jeśli okaże się, że sygnatariusz nadużywa swojej władzy i powoduje chaos, pozostali sygnatariusze mogą go odwołać.

Jeśli na przykład jest 10 autoryzowanych sygnatariuszy i każdy sygnatariusz może utworzyć 1 blok z 20, to w danym momencie 11 walidatorów może tworzyć bloki. Aby zapobiec ich wyścigowi o tworzenie bloków, każdy sygnatariusz dodaje mały losowy „offset” do czasu, w którym wydaje nowy blok. Zmniejsza to występowanie małych forków, ale nadal pozwala na sporadyczne forki, jak widać w sieci głównej Ethereum. Jeśli sygnatariusz nadużyje swojej władzy i spowoduje zakłócenia, może zostać odwołany z sieci.

## Zalety i wady {#pros-and-cons}

| Zalety                                                                                                                                                                                 | Wady                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bardziej skalowalny niż inne popularne mechanizmy, takie jak PoS i PoW, ponieważ opiera się na ograniczonej liczbie sygnatariuszy bloków.                              | Sieci PoA zazwyczaj mają stosunkowo niewielką liczbę węzłów walidujących. To sprawia, że sieć PoA jest bardziej scentralizowana.                        |
| Blockchainy PoA są niezwykle tanie w prowadzeniu i utrzymaniu.                                                                                                         | Zostanie autoryzowanym sygnatariuszem jest zazwyczaj poza zasięgiem zwykłej osoby, ponieważ blockchain wymaga podmiotów o ugruntowanej reputacji.                       |
| Transakcje są potwierdzane bardzo szybko, co może zająć mniej niż 1 sekundę, ponieważ do walidacji nowych bloków wymagana jest tylko ograniczona liczba sygnatariuszy. | Złośliwi sygnatariusze mogliby dokonać reorganizacji, podwójnego wydatkowania, cenzurować transakcje w sieci. Te ataki są łagodzone, ale wciąż możliwe. |

## Dalsza lektura {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _standard Clique_
- [Badanie Proof of Authority](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kryptoekonomia_
- [Czym jest Proof of Authority](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Wyjaśnienie Proof of Authority](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA w blockchainie](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Wyjaśnienie Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Przestarzałe PoA, specyfikacja Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, inna implementacja PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

Obejrzyj wizualne wyjaśnienie dowodu autorytetu:

<YouTube id="Mj10HSEM5_8" />

## Powiązane tematy {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

