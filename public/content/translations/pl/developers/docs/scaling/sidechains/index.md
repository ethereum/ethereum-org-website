---
title: Łańcuchy boczne
description: Wprowadzenie do łańcuchów bocznych jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
sidebarDepth: 3
---

Łańcuch poboczny jest osobnym blockchainem, który działa niezależnie od Ethereum i jest podłączony do głównej sieci Ethereum mostem działającym w obie strony. Łańcuchy poboczne mogą mieć oddzielne parametry bloków i [algorytmy konsensusu](/developers/docs/consensus-mechanisms/), które często są projektowane w celu wydajnego przetwarzania transakcji. Używanie łańcucha pobocznego wiąże się jednak z pewnymi kompromisami z uwagi na to, że nie dziedziczą one właściwości zabezpieczających Ethereum. W przeciwieństwie do [rozwiązań skalowania warstwy 2](/layer-2/) łańcuchy poboczne nie publikują zmian stanu ani danych transakcyjnych z powrotem w sieci głównej Ethereum.

Łańcuchy poboczne poświęcają również pewien stopień decentralizacji lub bezpieczeństwa, aby osiągnąć wysoką przepustowość ([trylemat skalowalności](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum jest jednak zaangażowane w skalowanie bez kompromisów w zakresie decentralizacji i bezpieczeństwa.

## Jak działają łańcuchy poboczne? {#how-do-sidechains-work}

Łańcuchy poboczne są niezależnymi blockchainami, z różnymi historiami, planami rozwoju oraz zamysłami projektowymi. Łańcuch poboczny oraz Ethereum mogą łączyć pewne powierzchowne podobieństwa, ale mają one kilka wyróżniających cech.

### Algorytmy konsensusu {#consensus-algorithms}

Jedną z własności, która wyróżnia łańcuchy poboczne, (np. od Ethereum) jest zastosowany algorytm konsensusu. Łańcuchy poboczne nie polegają na Ethereum w kwestii konsensusu i mogą wybrać alternatywny protokół konsensusu, który pasuje do ich potrzeb. Kilka przykładów algorytmów konsensusu używanych przez łańcuchy poboczne to:

- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
- [Delegowany dowód stawki](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolerancja błędu bizantyjskiego](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Podobnie do Ethereum, łańcuchy poboczne mają węzły walidatorów, które weryfikują i przetwarzają transakcje, tworzą bloki oraz przechowują stan blockchainu. Walidatorzy są odpowiedzialni za utrzymanie konsensusu na całej sieci oraz zabezpieczenie jej przed wrogimi atakami.

#### Parametry bloku {#block-parameters}

Ethereum nakłada limity na [czasy bloków](/developers/docs/blocks/#block-time) (tj. czas potrzebny na wyprodukowanie nowych bloków) i [rozmiary bloków](/developers/docs/blocks/#block-size) (tj. ilość danych zawartych w każdym bloku, wyrażona w gazie). Łańcuchy poboczne natomiast często stosują inne parametry, przykładowo szybsze czas bloku i wyższy limit gazu, aby osiągnąć wysoką przepustowość, szybkie transakcje oraz niskie opłaty.

Ma to swoje zalety, ale również krytyczne implikacje w stosunku do decentralizacji oraz bezpieczeństwa sieci. Parametry bloku takie jak szybki czas bloku i duży rozmiar bloku, zwiększają trudność operowania pełnego węzła, pozostawiają zabezpieczenie łańcucha kilku odpowiedzialnym "superwęzłom". W takim scenariuszu ryzyko zmowy walidatorów lub wrogiego przejęcia łańcucha wzrasta.

Jeśli blockchain ma się skalować bez strat w kwestii decentralizacji, utrzymywanie węzła musi być dostępne dla każdego, nie tylko dla tych ze specjalistycznym sprzętem. Dlatego podejmowane są wysiłki, aby każdy mógł [uruchomić pełny węzeł](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) w sieci Ethereum.

### Kompatybilność z EVM {#evm-compatibility}

Niektóre łańcuchy poboczne są kompatybilne z EVM i mogą wykonywać kontrakty stworzone dla [Wirtualnej Maszyny Ethereum (EVM)](/developers/docs/evm/). Łańcuchy poboczne kompatybilne z EVM obsługują smart kontrakty [napisane w Solidity](/developers/docs/smart-contracts/languages/), a także inne języki smart kontraktów EVM, co oznacza, że smart kontrakty napisane dla sieci głównej Ethereum będą również działać na łańcuchach pobocznych kompatybilnych z EVM.

Oznacza to, że jeśli chcesz używać swojej [dapki](/developers/docs/dapps/) na łańcuchu pobocznym, jest to tylko kwestia wdrożenia [smart kontraktu](/developers/docs/smart-contracts/) na tym łańcuchu pobocznym. Zachowuje się on, daje odczucie i wygląda jak sieć główna — piszesz kontrakt w Solidity i wchodzisz w interakcję z łańcuchem poprzez RPC łańcucha pobocznego.

Ponieważ łańcuchy poboczne są kompatybilne z EVM, są uważane za przydatne [rozwiązanie skalujące](/developers/docs/scaling/) dla natywnych dapek Ethereum. Kiedy Twoja dapka jest na łańcuchu pobocznym, użytkownicy mogą cieszyć się niższymi opłatami gazowymi i szybszymi transakcjami, szczegónie, kiedy sieć główna jest obciążona.

Jednak, jak wcześniej wyjaśniono, używanie łańcucha pobocznego wiąże się ze znaczącymi kompromisami. Każdy łańcuch poboczny jest odpowiedzialny za swoje bezpieczeństwo i nie dziedziczy właściwości zabezpieczających Ethereum. To zwiększa ryzyko wrogich zachowań, które mogą wpłynąć na użytkowników lub sprawić, że ich środku będą zagrożone.

### Przenoszenie aktywów {#asset-movement}

W celu uczynienia osobnego blockchaina łańcuchem pobocznym w stosunku do głównej sieci Ethereum musi on stwarzać warunki do przenoszenia aktywów z oraz na główną sieć Ethereum. To współdziałanie z Ethereum jest możliwe dzięki mostom blockchain. [Mosty](/bridges/) wykorzystują smart kontrakty wdrożone w sieci głównej Ethereum i na łańcuchu pobocznym do kontrolowania przesyłania środków między nimi.

Mosty pomagają w przenoszeniu środków pomiędzy Ethereum i łańcuchami pobocznymi, jednak fizycznie nie są przenoszone. Zamiast tego zastosowane są mechanizmy obejmujące mintowanie i palenie są używane w celu przenoszenia wartości pomiędzy łańcuchami. Więcej o tym, [jak działają mosty](/developers/docs/bridges/#how-do-bridges-work).

## Zalety i wady łańcuchów pobocznych {#pros-and-cons-of-sidechains}

| Zalety                                                                                                                                                                  | Wady                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technologia zasilająca łańcuchy poboczne jest dobrze znana i korzysta z szerokiego wachlarza badań oraz usprawnień konstrukcyjnych.                     | Łańcuchy poboczne poświęcają część decentralizacji na rzecz skalowania oraz braku potrzeby zaufania.                                                          |
| Łańcuchy poboczne wspierają ogólne obliczenia i oferują kompatybilność z EVM (można na nich uruchomić dapki natywne dla Ethereum).   | Łańcuch poboczny korzysta z osobnego mechanizmu konsensusu i nie czerpie korzyści z gwarancji bezpieczeństwa Ethereum.                                        |
| Łańcuchy poboczne używają różnych modeli konsensusu, aby wydajnie przetwarzać transakcje oraz obniżać koszty transakcyjne ponoszone przez użytkowników. | Łańcuchy poboczne wymagają więcej zaufania (np. kworum złośliwych walidatorów łańcucha pobocznego możne dokonać oszustwa). |
| Łańcuchy poboczne kompatybilne z EVM pozwalają dapkom na rozszerzenie swojego ekosystemu.                                                               |                                                                                                                                                                               |

### Korzystaj z łańcuchów pobocznych {#use-sidechains}

Wiele projektów dostarcza implementacje łańcuchów bocznych, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (dawniej xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Dalsza lektura {#further-reading}

- [Skalowanie dapek Ethereum za pomocą łańcuchów pobocznych](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 lutego 2018 r. – Georgios Konstantopoulos_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
