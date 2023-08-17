---
title: Validium
description: Wprowadzenie do Validium jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Używa dowodów ważności takich jak [pakiety zbiorcze ZK](#zk-rollups), ale dane nie są przechowywane na głównej warstwie 1 łańcucha Ethereum. Może to prowadzić do 10k transakcji na sekundę na łańcuch validium i wiele łańcuchów może być uruchomionych równolegle.

## Warunki wstępne {#prerequisites}

Musisz dobrze się orientować we wszystkich podstawowych tematach i mieć zaawansowaną wiedzę na temat [skalowania Ethereum](/developers/docs/scaling/). Wdrażanie rozwiązań skalowania takich jak Validium jest trudnym tematem, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Plusy i minusy {#pros-and-cons}

| Zalety                                                                                                                                    | Wady                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brak opóźnienia w wycofaniu (brak opóźnień w przypadku transakcji on-chain/cross-chain); co za tym idzie, większa efektywność kapitałowa. | Ograniczone wsparcie dla ogólnych obliczeń / kontraktów inteligentnych; wymagane są specjalistyczne języki.                                                                        |
| Niepodatność na niektóre ataki gospodarcze, z którymi borykają się systemy oparte na oszustwach w zastosowaniach o wysokiej wartości.     | Wysoka moc obliczeniowa wymagana do generowania dowodów ZK; nieopłacalna dla zastosowań o niskiej wydajności.                                                                      |
|                                                                                                                                           | Dłuższy czas osiągnięcia subiektywnej nieodwołalności (10-30 min na wygenerowanie dowodu ZK) (ale szybsze osiągnięcie pełnej nieodwołalności, ponieważ nie ma opóźnień w sporach). |

### Wykorzystanie Validium {#use-validium}

Wiele projektów zapewnia implementacje Validium, które można zintegrować z twoimi aplikacjami zdecentralizowanymi:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Dalsza lektura {#further-reading}

- [Validium And The Layer 2 Two-By-Two – Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
