---
title: Kanały uzyskiwania informacji
description: Wprowadzenie do kanałów uzyskiwania informacji i kanałów płatności jako rozwiązania skalowania obecnie wykorzystywanego przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Kanały uzyskiwania informacji umożliwiają uczestnikom przeprowadzenie `x` transakcji off-chain, natomiast do sieci Ethereum przesyłają dwie transakcje on-chain. Pozwala to na niezwykle wysoką przepustowość transakcji.

## Warunki wstępne {#prerequisites}

Musisz dobrze się orientować we wszystkich podstawowych tematach i mieć zaawansowaną wiedzę na temat [skalowania Ethereum](/developers/docs/scaling/). Wdrażanie rozwiązań skalowania takich jak kanały jest trudnym tematem, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Kanały {#channels}

Uczestnicy muszą zablokować część stanu Ethereum, taką jak depozyt ETH, w umowie wielopodpisowej. Kontrakt wielostronny jest rodzajem umowy, która wymaga podpisu (a więc umowy) wielu kluczy prywatnych do wykonania.

Zablokowanie stanu w ten sposób jest pierwszą transakcją i otwiera kanał. Uczestnicy mogą następnie dokonywać transakcji szybko i swobodnie off-chain. Kiedy interakcja zostanie zakończona, zostanie zgłoszona ostateczna transakcja on-chain, odblokowując stan.

**Przydatne w przypadku**:

- wiele aktualizacji stanu
- kiedy liczba uczestników jest znana z góry
- kiedy uczestnicy są zawsze dostępni

Obecnie istnieją dwa rodzaje kanałów: kanały uzyskiwania informacji i kanały płatnicze.

## Kanały uzyskiwania informacji {#state-channels}

Kanał uzyskiwania informacji najlepiej jest wyjaśnić na przykładzie, np. gry w kółko i krzyżyk:

1. Stworzenie dla inteligentnego kontraktu z wielopodpisem w głównym łańcuchu Ethereum „sędziego”, który rozumie zasady gry w kółko i krzyżyk, i potrafi zidentyfikować Alice i Boba jako dwóch graczy w naszej grze. Ten kontrakt obejmuje nagrodę 1ETH.

2. Następnie Alice i Bob zaczynają grać w grę, otwierając kanał uzyskiwania informacji. Każdy ruch tworzy transakcję off-chain zawierającą „nonce”, co po prostu oznacza, że zawsze możemy później powiedzieć, w jakiej kolejności miały miejsce ruchy.

3. Kiedy zostanie wyłoniony zwycięzca, zamykają oni kanał, przekazując stan końcowy (np. listę transakcji) do kontraktu sędziowskiego, płacąc tylko pojedynczą opłatę transakcyjną. Sędzia zapewnia podpisanie tego „stanu końcowego” przez obie strony, i czeka przez pewien czas, aby zagwarantować, że nikt nie będzie w stanie podważyć wyniku, a następnie wypłaci Alice nagrodę w wysokości 1ETH.

## Kanały płatnicze {#payment-channels}

Uproszczone kanały płatnicze obsługujące wyłącznie płatności (np. transfery ETH). Pozwalają one na transfery off-chain pomiędzy dwoma uczestnikami, o ile suma netto ich transferów nie przekracza zdeponowanych tokenów.

## Plusy i minusy {#channels-pros-and-cons}

| Zalety                                                                                   | Wady                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Błyskawiczna wypłata/rozliczenie w sieci głównej (jeśli obie strony kanału współpracują) | Czas i koszt uruchomienia i rozliczenia kanału — niezbyt dobre rozwiązanie dla sporadycznych, jednorazowych transakcji pomiędzy dowolnymi użytkownikami.             |
| Możliwa jest bardzo duża przepustowość                                                   | Konieczność okresowego obserwowania sieci (wymóg aktywności) lub delegowania tej odpowiedzialności na kogoś innego w celu zapewnienia bezpieczeństwa Twoich środków. |
| Najniższy koszt za transakcję — dobry do strumieniowania mikropłatności                  | Konieczność zablokowania środków w otwartych kanałach płatności                                                                                                      |
|                                                                                          | Brak wsparcia otwartego uczestnictwa                                                                                                                                 |

## Używanie kanałów uzyskiwania informacji {#use-state-channels}

Wiele projektów dostarcza implementacje kanałów uzyskiwania informacji, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Dalsza lektura {#further-reading}

**Kanały uzyskiwania informacji**

- [EthHub na temat kanałów uzyskiwania informacji](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _06.11.2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Kanały płatnicze**

- [EthHub na temat kanałów płatniczych](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
