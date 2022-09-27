---
title: Wniosek dotyczący ulepszenia Ethereum (EIP)
description: Podstawowe informacje potrzebne do zrozumienia wniosków dotyczących ulepszeń Ethereum (EIP).
lang: pl
---

# Wprowadzenie do wniosków dotyczących ulepszeń Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## Czym są EIP? {#what-are-eips}

[Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/) to normy określające potencjalne nowe funkcje lub procesy Ethereum. EIP zawierają specyfikacje techniczne proponowanych zmian i działają jako „źródło prawdy” dla społeczności. Ulepszenia sieci i normy jej stosowania są omawiane i rozwijane w ramach procesu EIP.

Każdy w społeczności Ethereum ma możliwość stworzenia EIP. Wytyczne dotyczące pisania EIP są zawarte w [EIP 1](https://eips.ethereum.org/EIPS/eip-1). EIP powinna dostarczyć zwięzłą specyfikację techniczną dotyczącą jego uzasadnienia. Autor EIP jest odpowiedzialny za budowanie konsensusu w obrębie społeczności i dokumentowanie odmiennych opinii. Ze względu na wysoki poziom techniczny przesyłania dobrze uformowanych EIP, w przeszłości większość autorów EIP była twórcami aplikacji lub protokołów.

## Dlaczego EIP mają znaczenia? {#why-do-eips-matter}

EIP odgrywają kluczową rolę w tym, jak zachodzą zmiany i są udokumentowane na Ethereum. Stanowią one dla ludzi drogę do zaproponowania, debaty i przyjęcia zmian. Istnieją [różne typy EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), w tym podstawowe EIP dla zmian protokołu niskiego poziomu, które mają wpływ na konsensus i wymagają modernizacji sieci oraz ERBN dla standardów stosowania. Na przykład standardy tworzenia tokenów, takie jak [ERC20](https://eips.ethereum.org/EIPS/eip-20) lub [ERC721](https://eips.ethereum.org/EIPS/eip-721) zezwalają aplikacjom współdziałającym z tymi tokenami na przetwarzanie tokenów przy użyciu tych samych zasad, ułatwiające tworzenie interoperacyjnych aplikacji.

Każda aktualizacja sieci składa się z zestawu EIP, które muszą być zaimplementowane przez każdego [klienta Ethereum](/learn/#clients-and-nodes) w sieci. Oznacza to, że aby pozostać w konsensusie z innymi klientami w sieci głównej Ethereum, programiści klientów muszą upewnić się, że wszyscy zaimplementowali wymagane EIP.

Wraz z dostarczeniem specyfikacji technicznej zmian, EIP są jednostką, wokół której odbywa się zarządzanie w Ethereum: każdy może zaproponować jeden, a następnie różni interesariusze w społeczności będą debatować, aby ustalić, czy powinien zostać przyjęty jako standard, czy włączony do aktualizacja sieci. Ponieważ niepodstawowe EIP nie muszą być zaadaptowane przez wszystkie aplikacje (na przykład możesz utworzyć nie-[token ERC20](https://eips.ethereum.org/EIPS/eip-20)), ale podstawowe EIP muszą być powszechnie przyjęte (ponieważ wszystkie węzły muszą zostać zaktualizowane, aby pozostać częścią tej samej sieci), podstawowe EIP wymagają szerszego konsensusu w społeczności niż niepodstawowe EIP.

## Historia EIP {#history-of-eips}

[Repozytorium GitHub Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) zostało stworzone w październiku 2015 r. Proces EIP opiera się na procesie [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), który sam w sobie opiera się na [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Edytorzy EIP są zobowiązani do przeglądu EIP pod kątem poprawności technicznej, poprawnej pisowni/gramatyki oraz stylu kodu. Martin Becze, Vitalik Buterin, Gavin Wood i kilka innych osób było pierwszymi edytorami EIP od 2015 r. do końca 2016 r. Bieżącymi edytorami EIP są:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (społeczność)
- Casey Detrio (EWASM/Ethereum Foundation)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (społeczność)

## Dowiedz się więcej {#learn-more}

Jeśli chcesz dowiedzieć się więcej na temat EIP, sprawdź stronę [EIP](https://eips.ethereum.org/), na której można znaleźć dodatkowe informacje, w tym:

- [Różne rodzaje EIP](https://eips.ethereum.org/)
- [Została utworzona lista wszytkich EIP](https://eips.ethereum.org/all)
- [Statusy EIP i ich znaczenie](https://eips.ethereum.org/)

## Uczestnictwo {#participate}

Jeśli chcesz śledzić lub dzielić się swoim wkładem na temat EIP, sprawdź [Ethereum Magicians forum](https://ethereum-magicians.org/), gdzie EIP są omawiane ze społecznością.

Zobacz też:

- [Jak utworzyć EIP](https://eips.ethereum.org/EIPS/eip-1)

## Źródła {#references}

<cite class="citation">

Zawartość strony dostarczona w części z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) przez Hudsona Jamesona

</cite>
