---
title: "Łańcuchy poboczne"
description: "Wprowadzenie do łańcuchów pobocznych jako rozwiązania skalującego obecnie wykorzystywanego przez społeczność Ethereum."
lang: pl
sidebarDepth: 3
---

Łańcuch poboczny to oddzielny blockchain, który działa niezależnie od [Ethereum](/) i jest połączony z siecią główną Ethereum za pomocą dwukierunkowego mostu. Łańcuchy poboczne mogą mieć oddzielne parametry bloku i [algorytmy konsensusu](/developers/docs/consensus-mechanisms/), które często są projektowane z myślą o wydajnym przetwarzaniu transakcji. Korzystanie z łańcucha pobocznego wiąże się jednak z kompromisami, ponieważ nie dziedziczą one właściwości bezpieczeństwa Ethereum. W przeciwieństwie do [rozwiązań skalujących warstwy 2 (L2)](/layer-2/), łańcuchy poboczne nie przesyłają zmian stanu ani danych transakcji z powrotem do sieci głównej Ethereum.

Łańcuchy poboczne poświęcają również pewną miarę decentralizacji lub bezpieczeństwa, aby osiągnąć wysoką przepustowość ([trylemat skalowalności](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum jest jednak zaangażowane w skalowanie bez kompromisów w zakresie decentralizacji i bezpieczeństwa.

## Jak działają łańcuchy poboczne? {#how-do-sidechains-work}

Łańcuchy poboczne to niezależne blockchainy, z różnymi historiami, planami rozwoju i założeniami projektowymi. Chociaż łańcuch poboczny może mieć pewne powierzchowne podobieństwa do Ethereum, posiada kilka charakterystycznych cech.

### Algorytmy konsensusu {#consensus-algorithms}

Jedną z cech, która czyni łańcuchy poboczne unikalnymi (tj. różnymi od Ethereum), jest zastosowany algorytm konsensusu. Łańcuchy poboczne nie polegają na Ethereum w kwestii konsensusu i mogą wybierać alternatywne protokoły konsensusu, które odpowiadają ich potrzebom. Niektóre przykłady algorytmów konsensusu używanych w łańcuchach pobocznych obejmują:

- [Dowód autorytetu (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Delegowany dowód stawki (DPoS)](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolerancja błędów bizantyjskich (BFT)](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Podobnie jak Ethereum, łańcuchy poboczne mają węzły walidujące, które weryfikują i przetwarzają transakcje, produkują bloki i przechowują stan blockchaina. Walidatorzy są również odpowiedzialni za utrzymanie konsensusu w całej sieci i zabezpieczenie jej przed złośliwymi atakami.

#### Parametry bloku {#block-parameters}

Ethereum nakłada limity na [czasy bloku](/developers/docs/blocks/#block-time) (tj. czas potrzebny na wyprodukowanie nowych bloków) i [rozmiary bloku](/developers/docs/blocks/#block-size) (tj. ilość danych zawartych w bloku wyrażoną w gazie). Z kolei łańcuchy poboczne często przyjmują inne parametry, takie jak krótsze czasy bloku i wyższe limity gazu, aby osiągnąć wysoką przepustowość, szybkie transakcje i niskie opłaty.

Chociaż ma to pewne korzyści, niesie ze sobą krytyczne implikacje dla decentralizacji i bezpieczeństwa sieci. Parametry bloku, takie jak krótkie czasy bloku i duże rozmiary bloku, zwiększają trudność uruchomienia pełnego węzła — pozostawiając kilka „superwęzłów” odpowiedzialnych za zabezpieczenie łańcucha. W takim scenariuszu wzrasta prawdopodobieństwo zmowy walidatorów lub złośliwego przejęcia łańcucha.

Aby blockchainy mogły się skalować bez szkody dla decentralizacji, uruchomienie węzła musi być otwarte dla każdego — niekoniecznie dla stron dysponujących specjalistycznym sprzętem. Dlatego trwają prace nad tym, aby każdy mógł [uruchomić pełny węzeł](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) w sieci Ethereum.

### Kompatybilność z EVM {#evm-compatibility}

Niektóre łańcuchy poboczne są kompatybilne z EVM i mogą wykonywać kontrakty opracowane dla [Maszyny Wirtualnej Ethereum (EVM)](/developers/docs/evm/). Łańcuchy poboczne kompatybilne z EVM obsługują inteligentne kontrakty [napisane w Solidity](/developers/docs/smart-contracts/languages/), a także w innych językach inteligentnych kontraktów EVM, co oznacza, że inteligentne kontrakty napisane dla sieci głównej Ethereum będą również działać na łańcuchach pobocznych kompatybilnych z EVM.

Oznacza to, że jeśli chcesz użyć swojej [zdecentralizowanej aplikacji (dapp)](/developers/docs/dapps/) na łańcuchu pobocznym, wystarczy wdrożyć swój [inteligentny kontrakt](/developers/docs/smart-contracts/) na tym łańcuchu pobocznym. Wygląda, działa i zachowuje się dokładnie tak samo jak Sieć główna — piszesz kontrakty w Solidity i wchodzisz w interakcję z łańcuchem za pośrednictwem RPC łańcucha pobocznego.

Ponieważ łańcuchy poboczne są kompatybilne z EVM, uważa się je za przydatne [rozwiązanie skalujące](/developers/docs/scaling/) dla natywnych aplikacji dapp Ethereum. Dzięki aplikacji dapp na łańcuchu pobocznym użytkownicy mogą cieszyć się niższymi opłatami za gaz i szybszymi transakcjami, zwłaszcza jeśli Sieć główna jest przeciążona.

Jednak, jak wyjaśniono wcześniej, korzystanie z łańcucha pobocznego wiąże się ze znacznymi kompromisami. Każdy łańcuch poboczny jest odpowiedzialny za swoje bezpieczeństwo i nie dziedziczy właściwości bezpieczeństwa Ethereum. Zwiększa to prawdopodobieństwo złośliwych zachowań, które mogą wpłynąć na Twoich użytkowników lub narazić ich środki na ryzyko.

### Przepływ aktywów {#asset-movement}

Aby oddzielny blockchain stał się łańcuchem pobocznym dla sieci głównej Ethereum, musi mieć możliwość ułatwienia transferu aktywów z i do sieci głównej Ethereum. Ta interoperacyjność z Ethereum jest osiągana za pomocą mostu blockchain. [Mosty](/bridges/) wykorzystują inteligentne kontrakty wdrożone w sieci głównej Ethereum i łańcuchu pobocznym do kontrolowania przenoszenia środków między nimi.

Chociaż mosty pomagają użytkownikom przenosić środki między Ethereum a łańcuchem pobocznym, aktywa nie są fizycznie przenoszone między dwoma łańcuchami. Zamiast tego do transferu wartości między łańcuchami wykorzystywane są mechanizmy, które zazwyczaj obejmują wybijanie i spalanie. Więcej o tym, [jak działają mosty](/developers/docs/bridges/#how-do-bridges-work).

## Plusy i minusy łańcuchów pobocznych {#pros-and-cons-of-sidechains}

| Plusy                                                                                                                       | Minusy                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Technologia leżąca u podstaw łańcuchów pobocznych ma ugruntowaną pozycję i korzysta z szeroko zakrojonych badań oraz ulepszeń w projektowaniu. | Łańcuchy poboczne poświęcają pewną miarę decentralizacji i bezzaufaniowości na rzecz skalowalności.                          |
| Łańcuchy poboczne obsługują ogólne obliczenia i oferują kompatybilność z EVM (mogą uruchamiać natywne aplikacje dapp Ethereum).                    | Łańcuch poboczny wykorzystuje oddzielny mechanizm konsensusu i nie korzysta z gwarancji bezpieczeństwa Ethereum.         |
| Łańcuchy poboczne wykorzystują różne modele konsensusu do wydajnego przetwarzania transakcji i obniżania opłat transakcyjnych dla użytkowników.         | Łańcuchy poboczne wymagają wyższych założeń dotyczących zaufania (np. kworum złośliwych walidatorów łańcucha pobocznego może dopuścić się oszustwa). |
| Łańcuchy poboczne kompatybilne z EVM pozwalają aplikacjom dapp na rozszerzenie ich ekosystemu.                                                            |                                                                                                                  |

### Korzystanie z łańcuchów pobocznych {#use-sidechains}

Wiele projektów dostarcza implementacje łańcuchów pobocznych, które możesz zintegrować ze swoimi aplikacjami dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (dawniej xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Dalsza lektura {#further-reading}

- [Skalowanie aplikacji dapp Ethereum poprzez łańcuchy poboczne](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 lutego 2018 r. - Georgios Konstantopoulos_

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_