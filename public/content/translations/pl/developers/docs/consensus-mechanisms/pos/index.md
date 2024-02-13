---
title: Proof-of-stake (PoS)
description: Wyjaśnienie protokołu konsensusu bazującego na dowodzie stawki (ang. proof-of-stake) i jego roli w Ethereum.
lang: pl
incomplete: true
---

Ethereum przechodzi na mechanizm konsensusu zwany dowodem stawki (ang. proof-of-stake, skr. PoS) z poprzednio wykorzystywanego [dowodu wykonanej pracy](/developers/docs/consensus-mechanisms/pow/) (ang. proof-of-work, skr. PoW). Taki plan istniał od zawsze, ponieważ skalowanie Ethereum przez uaktualnienia do [Eth2](/roadmap/) jest kluczowym elementem strategii obranej przez społeczność. Właściwe opracowanie PoS jest jednak dużym wyzwaniem technicznym i nie tak oczywistym jak wykorzystanie PoW do uzyskiwania konsensusu w obrębie sieci.

## Wymagania wstępne {#prerequisites}

Aby lepiej rozumieć tę stronę, zalecamy zapoznanie się najpierw z tematyką [mechanizmów konsensualnych](/developers/docs/consensus-mechanisms/).

## Czym jest dowód stawki (PoS)? {#what-is-pos}

Dowód stawki (ang. proof-of-stake) jest rodzajem [mechanizmu konsensualnego](/developers/docs/consensus-mechanisms/) wykorzystywanego w sieciach bazujących na technologii blockchain, aby uzyskiwać rozproszony konsensus.

Wymaga się w nim od użytkowników zastawienia należących do nich ETH, aby mogli stać się walidatorami w sieci. Walidatorzy są odpowiedzialni za to samo, co górnicy w mechanizmie [proof-of-work](/developers/docs/consensus-mechanisms/pow/): porządkowanie transakcji i tworzenie nowych bloków, żeby wszystkie węzły były w stanie zgodnie się porozumieć odnośnie do stanu sieci.

System proof-of-stake wiąże się z wieloma udoskonaleniami w stosunku do proof-of-work:

- lepsza wydajność energetyczna – nie musisz zużywać wiele energii wykopując bloki;
- niższe bariery wejścia, obniżone wymagania sprzętowe – nie musisz posiadać elitarnego sprzętu, aby mieć szansę wytwarzania nowych bloków;
- większa odporność na centralizację – proof-of-stake powinien prowadzić do pojawienia się większej liczby węzłów w sieci;
- lepsza obsługa łańcuchów odłamkowych (ang. shard chains) – kluczowa aktualizacja w kwestii skalowania sieci Ethereum

## Proof-of-stake, zastawianie i walidatorzy {#pos-staking-validators}

Proof-of-stake to bazowy mechanizm aktywizacji walidatorów po otrzymaniu wymaganego zastawu. W przypadku Ethereum użytkownicy będą musieli zestakować 32 ETH, aby zostać walidatorami. Walidatorzy wybierani są losowo do wytwarzania bloków, a także są odpowiedzialni za sprawdzanie oraz potwierdzanie bloków niewytworzonych przez siebie. Stake (zastaw) użytkownika jest też wykorzystywany jako sposób zachęcania walidatorów do dobrego zachowania. Na przykład użytkownik może stracić część zastawionych środków za przejście w tryb offline (odmowę walidacji), a nawet cały zastaw, jeżeli dopuści się celowej zmowy.

## Jak działa proof-of-stake z Ethereum? {#how-does-pos-work}

W przeciwieństwie do proof-of-work walidatorzy nie muszą zużywać znacznych ilości mocy obliczeniowych, ponieważ są wybierani losowo i nie konkurują ze sobą. Nie muszą wydobywać bloków, potrzebują jedynie wytwarzać je, gdy zostaną wybrani i sprawdzać zaproponowane bloki, gdy wybranymi nie są. Taka walidacja znana jest jako poświadczanie. Możesz myśleć o poświadczaniu, jak o mówieniu „dla mnie ten blok wygląda dobrze”. Walidatorzy są nagradzani za proponowanie nowych bloków i poświadczanie tych, które ujrzeli.

Jeżeli poświadczasz szkodliwe bloki, tracisz zastaw.

### Łańcuch śledzący {#the-beacon-chain}

Gdy Ethereum zastąpi proof-of-work przez proof-of-stake, zostanie dodana złożoność [łańcuchów odłamkowych](/roadmap/danksharding/). Są to oddzielne blockchainy, które będą potrzebowały walidatorów do przetwarzania transakcji i tworzenia nowych bloków. Planowane są 64 łańcuchy odłamkowe, a wszystkie one wymagają współdzielonego porozumienia w kwestii stanu sieci. Potrzebna jest więc dodatkowa koordynacja, która zostanie zrealizowana z użyciem [łańcucha nawigacyjnego](/roadmap/beacon-chain/).

Łańcuch śledzący odbiera informację o stanie z odłamków (fragmentów) i udostępnia ją innym odłamkom, aby sieć mogła pozostać zsynchronizowana. Łańcuch śledzący zarządza również walidatorami, od rejestrowania ich depozytów zastawnych po wydawanie im nagród i kar.

Oto jak działa ten proces.

### Jak działa walidacja {#how-does-validation-work}

Gdy zlecasz transakcję na odłamku, walidator będzie odpowiedzialny za dodanie twojej transakcji do bloku odłamków. Walidatorzy są algorytmicznie wybierani przez łańcuch śledzący, aby proponować nowe bloki.

#### Poświadczanie {#attestation}

Jeżeli walidator nie został wybrany do proponowania nowego bloku odłamkowego, musi poświadczyć propozycję innego walidatora i potwierdzić, że wszystko wygląda jak powinno. To właśnie poświadczanie jest zapisywane w łańcuchu śledzącym, a nie sama transakcja.

Do poświadczenia każdego bloku odłamków potrzeba co najmniej 128 walidatorów – są oni znani jako „komitet”.

Komitet ma ramy czasowe na zaproponowanie i walidację bloku odłamkowego. Jest to znane pod nazwą „slot”. W obrębie slotu wytwarzany jest wyłącznie jeden poprawny blok. W pojedynczej „epoce” istnieją 32 sloty. Po każdej epoce komitet jest rozwiązywany i formowany ponownie z innych, losowych uczestników. Pomaga to dbać o zabezpieczanie odłamków przed złymi figurantami.

#### Odnośniki krzyżowe {#rewards-and-penalties}

Gdy tylko propozycja nowego bloku odłamkowego ma wystarczającą liczbę poświadczeń, tworzony jest „odnośnik krzyżowy”, który potwierdza włączenie bloku, jak i Twojej transakcji, w łańcuchu śledzącym.

Gdy tylko pojawi się odnośnik krzyżowy, walidator, który zaproponował blok, otrzymuje swoją nagrodę.

#### Nieodwołalność {#finality}

W sieciach rozproszonych transakcja osiąga „nieodwołalność”, gdy staje się częścią bloku, który nie może się zmienić.

Żeby osiągnąć to w modelu proof-of-stake, wykorzystywany jest Casper, protokół nieodwołalności, który zakłada, że walidatorzy muszą być zgodni odnośnie do stanu bloku w pewnych punktach kontrolnych. Gdy tylko zgodzi się ze sobą 2/3 walidatorów, blok jest finalizowany. Walidatorzy stracą cały zastaw, jeżeli spróbują odwołać tę operację później z użyciem ataku 51%.

Jak to ujął Vlad Zamfir, przypomina to sytuację, w której sprzęt górników biorących udział w ataku 51% uległby natychmiastowemu spaleniu.

## Proof-of-stake i bezpieczeństwo

W modelu proof-of-stake zagrożenie [atakiem 51%](https://www.investopedia.com/terms/1/51-attack.asp) wciąż istnieje, lecz jest jeszcze bardziej ryzykowne dla napastników. Aby przeprowadzić taki atak, potrzebujesz kontroli nad co najmniej 51% zastawionych ETH. To nie tylko mnóstwo pieniędzy, ale prawdopodobnie spowodowałoby spadek wartości ETH. Motywacja do zniszczenia wartości waluty jest bardzo mała, jeżeli masz w tej walucie większościowy udział. Motywacja, aby utrzymać sieć bezpieczną i w dobrym stanie, jest mocniejsza.

Aby zapobiegać innym aktom złego zachowania, łańcuch śledzący będzie koordynować cięcia zastawów, odrzucenia i inne sankcje. Walidatorzy będą również odpowiedzialni za zgłaszanie tego typu incydentów.

## Wady i zalety {#pros-and-cons}

| Zalety                                                                                                                                                                                                                                                                                                                                           | Wady                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Zastawianie (staking) ułatwia ci uruchamianie węzła. Nie wymaga ogromnych inwestycji w sprzęt czy energię. A nawet wtedy, gdy nie masz wystarczającej ilości ETH, aby je zastawić, możesz przyłączać się do syndykatów zastawnych (ang. staking pools).                                                                                          | Proof-of-stake jest jeszcze w powijakach, a w porównaniu z proof-of-work jest systemem mniej zaprawionym w bojach. |
| Zastawianie jest bardziej zdecentralizowane. Pozwala na zwiększające się uczestnictwo, zaś więcej węzłów nie oznacza zwiększenia % zwrotów, jak w przypadku wydobywania.                                                                                                                                                                         |                                                                                                                    |
| Zastawianie pozwala na bezpieczny sharding (wykorzystanie bloków i łańcuchów odłamkowych). Łańcuchy odłamkowe pozwalają Ethereum na wytwarzanie wielu bloków w tym samym czasie, zwiększając transakcyjną przepustowość. Fragmentacja sieci w systemie proof-of-work ograniczyłaby po prostu energię potrzebną do zdyskredytowania części sieci. |                                                                                                                    |

## Dalsza lektura {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/), _ ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/), _Ethos.dev_

## Tematy powiązane {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
