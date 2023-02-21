---
title: Łańcuchy boczne
description: Wprowadzenie do łańcuchów bocznych jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Łańcuch boczny jest oddzielnym blockchainem działającym równolegle do sieci głównej Ethereum i działającym niezależnie od niej. Ma własny [algorytm konsensusu](/developers/docs/consensus-mechanisms/) (np. [Proof of Authority](https://wikipedia.org/wiki/Proof_of_authority), [delegowany proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [tolerancję błędów bizantyjskich](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). Jest połączony z siecią główną dwustronnym mostkiem.

To, co jest szczególnie fascynującą cechą łańcuchów bocznych, to fakt, że taki łańcuch działa tak samo, jak główny łańcuch Ethereum, ponieważ jest oparty na [EVM](/developers/docs/evm/). Nie korzysta z Ethereum, ale jest Ethereum. To znaczy, że jeśli chcesz użyć swojej [aplikacji zdecentralizowanej](/developers/docs/dapps/) w łańcuchu bocznym, wystarczy wdrożyć własny kod do tego łańcucha. Wygląda i działa tak samo jak sieć główna — piszesz kontrakty w Solidity, i dokonujesz operacji na łańcuchu za pośrednictwem API Web3.

## Warunki wstępne {#prerequisites}

Musisz dobrze się orientować we wszystkich podstawowych tematach i mieć zaawansowaną wiedzę na temat [skalowania Ethereum](/developers/docs/scaling/).

## Plusy i minusy {#pros-and-cons}

| Zalety                                           | Wady                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Ugruntowana technologia.                         | Mniejsza decentralizacja.                                                                                     |
| Obsługa obliczeń ogólnych, kompatybilność z EVM. | Korzysta z odrębnego mechanizmu konsensusu. Niezabezpieczone warstwą 1 (więc technicznie nie jest warstwą 2). |
|                                                  | Kworum walidatorów łańcuchów bocznych może popełnić oszustwa.                                                 |

### Używanie łańcuchów bocznych {#use-sidechains}

Wiele projektów dostarcza implementacje łańcuchów bocznych, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Skale](https://skale.network/)
- [Sieć POA](https://www.poa.network/)
- [Gnosis Chain (formerly xDai)](https://www.xdaichain.com/)

## Dalsza lektura {#further-reading}

- [EthHub na temat łańcuchów bocznych](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
