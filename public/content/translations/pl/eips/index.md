---
title: Wniosek dotyczący ulepszenia Ethereum (EIP)
description: Podstawowe informacje potrzebne do zrozumienia propozycji EIP
lang: pl
---

# Wprowadzenie do propozycji ulepszeń Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Czym są EIP? {#what-are-eips}

[Propozycje ulepszeń w Ethereum (EIP)](https://eips.ethereum.org/) to standardy określające potencjalne nowe funkcje lub procesy dla Ethereum. EIP zawierają specyfikacje techniczne proponowanych zmian i działają jako „źródło prawdy” dla społeczności. Ulepszenia sieci i normy jej stosowania są omawiane i rozwijane w ramach procesu EIP.

Każdy w społeczności Ethereum ma możliwość stworzenia EIP. Wytyczne dotyczące pisania EIP znajdują się w [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP powinna przede wszystkim zawierać zwięzłą specyfikację techniczną z niewielką ilością motywacji. Autor EIP jest odpowiedzialny za osiągnięcie konsensusu w społeczności i udokumentowanie odmiennych opinii. Ze względu na wysoką barierę techniczną związaną z wysłaniem dobrze sformatowanej propozycji EIP większość autorów EIP to zazwyczaj deweloperzy aplikacji lub protokołów.

## Dlaczego EIP mają znaczenia? {#why-do-eips-matter}

EIP odgrywają kluczową rolę w tym, jak zachodzą zmiany i są udokumentowane na Ethereum. Są one dla ludzi sposobem na proponowanie, debatowanie i przyjmowanie zmian. Istnieją [różne typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), w tym podstawowe EIP dotyczące zmian w protokole niskiego poziomu, które wpływają na konsensus i wymagają aktualizacji sieci, jak [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), oraz ERC dla standardów aplikacji, jak [EIP-20](https://eips.ethereum.org/EIPS/eip-20) i [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Każda aktualizacja sieci składa się z zestawu EIP, które muszą zostać wdrożone przez każdego [klienta Ethereum](/learn/#clients-and-nodes) w sieci. To znaczy, że aby utrzymać konsensus z innymi klientami w sieci głównej Ethereum, deweloperzy klientów muszą upewnić się, że wszyscy wdrożyli wymagane EIP.

Wraz z dostarczeniem specyfikacji technicznej zmian, EIP są jednostką, wokół której odbywa się zarządzanie w Ethereum: każdy może zaproponować jeden, a następnie różni interesariusze w społeczności będą debatować, aby ustalić, czy powinien zostać przyjęty jako standard, czy włączony do aktualizacja sieci. Jako że EIP inne niż podstawowe nie muszą być przyjęte przez wszystkie aplikacje (na przykład można utworzyć zamienny token, który nie implementuje propozycji EIP-20), ale podstawowe EIP muszą być powszechnie przyjęte (ponieważ wszystkie węzły muszą się uaktualnić, aby pozostać częścią tej samej sieci), podstawowe EIP wymagają szerszego konsensusu w społeczności niż EIP inne niż podstawowe.

## Historia EIP {#history-of-eips}

[Repozytorium GitHub propozycji ulepszeń Ethereum (EIP)](https://github.com/ethereum/EIPs) zostało utworzone w październiku 2015 roku. Proces EIP jest oparty na procesie [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), który z kolei jest oparty na procesie [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Edytorzy EIP są zobowiązani do sprawdzania EIP pod względem poprawności technicznej, formatowania, pisowni, gramatyki oraz stylu kodu. Martin Becze, Vitalik Buterin, Gavin Wood i kilka innych osób było pierwszymi edytorami EIP od 2015 r. do końca 2016 r.

Bieżącymi edytorami EIP są

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emerytowani edytorzy EIP to

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Jeśli chcesz zostać redaktorem EIP, sprawdź [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Edytorzy EPI decydują, kiedy propozycja jest gotowa, aby stać się EIP, i pomagają autorom EPI w realizacji ich propozycji. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) pomagają w organizacji spotkań redaktorów EIP i społeczności (zobacz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Pełny proces standaryzacji wraz z wykresem jest opisany w [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Dowiedz się więcej {#learn-more}

Jeśli chcesz dowiedzieć się więcej o EIP, odwiedź [stronę EIP](https://eips.ethereum.org/) i zapoznaj się z [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Oto kilka przydatnych linków:

- [Lista wszystkich propozycji ulepszeń Ethereum](https://eips.ethereum.org/all)
- [Opis wszystkich typów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Opis wszystkich statusów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projekty edukacyjne społeczności {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP to seria filmów edukacyjnych, która omawia propozycje ulepszeń Ethereum (EIP) oraz kluczowe cechy nadchodzących aktualizacji._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf dostarcza dodatkowych informacji na temat propozycji ulepszeń Ethereum (EIP), w tym ich status, szczegóły implementacji, powiązane pull requesty i opinie społeczności._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun dostarcza najnowsze wiadomości na temat propozycji ulepszeń Ethereum (EIP), aktualizacje ze spotkań EIP i nie tylko._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight to przedstawienie stanu procesu propozycji ulepszeń Ethereum (EIP) i statystyk na podstawie informacji zebranych z różnych źródeł._

## Weź udział {#participate}

Każdy może utworzyć EIP. Przed złożeniem propozycji należy przeczytać [EIP-1](https://eips.ethereum.org/EIPS/eip-1), który opisuje proces EIP i sposób pisania EIP, a także poprosić o opinie na forum [Ethereum Magicians](https://ethereum-magicians.org/), gdzie propozycje są najpierw omawiane ze społecznością przed złożeniem wersji roboczej.

## Materiały źródłowe {#references}

<cite class="citation">

Zawartość strony dostarczona w części z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) przez Hudsona Jamesona

</cite>
