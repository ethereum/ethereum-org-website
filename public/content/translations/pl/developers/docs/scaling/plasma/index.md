---
title: Łańcuchy plazmy
description: Wprowadzenie do łańcuchów plazmowych jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Łańcuch plazmowy to oddzielny blockchain, który jest zakotwiczony w głównym łańcuchu Ethereum, i używa dowodów oszustw (takich jak [optymistyczne pakiety zbiorcze](/developers/docs/scaling/optimistic-rollups/)) do arbitrażu sporów. Te łańcuchy są niekiedy określane jako „potomne”, ponieważ zasadniczo są mniejszymi kopiami sieci głównej Ethereum. Drzewa Merkle umożliwiają tworzenie nieograniczonych stosów takich łańcuchów, które mogą pracować nad odciążeniem sieci macierzystych (w tym sieci głównej). Uzyskują zabezpieczenia za pośrednictwem [dowodów oszustwa](/glossary/#fraud-proof), a każdy kanał potomny ma własny mechanizm walidacji bloków.

## Warunki wstępne {#prerequisites}

Musisz dobrze się orientować we wszystkich podstawowych tematach i mieć zaawansowaną wiedzę na temat [skalowania Ethereum](/developers/docs/scaling/). Wdrażanie rozwiązań skalowania takich jak plazma jest trudnym tematem, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Plusy i minusy {#pros-and-cons}

| Zalety                                                                                                                                                       | Wady                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Wysoka przepustowość, niski koszt każdej transakcji.                                                                                                         | Nie obsługuje obliczeń ogólnych. Tylko podstawowe transfery, swapy i kilka innych typów transakcji są obsługiwane za pośrednictwem logiki predykatu.                                       |
| Dobre w przypadku transakcji między dowolnymi użytkownikami (brak kosztów nadrzędnych na parę użytkowników, jeśli obydwaj są określeni w łańcuchu plazmowym) | Konieczność okresowego obserwowania sieci (wymóg aktywności) lub delegowania tej odpowiedzialności na kogoś innego w celu zapewnienia bezpieczeństwa Twoich środków.                       |
|                                                                                                                                                              | Polega na jednym lub kilku operatorach do przechowywania danych i dostarczania ich na żądanie.                                                                                             |
|                                                                                                                                                              | Wycofanie jest opóźnione o kilka dni, aby umożliwić kwestionowanie. W przypadku aktywów zamiennych można to złagodzić przez dostawców płynności, ale wiąże się to z kosztami kapitałowymi. |

### Użycie plazmy {#use-plasma}

Wiele projektów dostarcza implementacje Plasma, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Sieć OMG](https://omg.network/)
- [Polygon](https://polygon.technology/), [poprzednio Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
