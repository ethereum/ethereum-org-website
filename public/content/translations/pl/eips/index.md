---
title: Wniosek dotyczący ulepszenia Ethereum (EIP)
description: Podstawowe informacje potrzebne do zrozumienia propozycji EIP
lang: pl
---

# Wprowadzenie do propozycji ulepszeń Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Czym są EIP? {#what-are-eips}

[Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/) to normy określające potencjalne nowe funkcje lub procesy Ethereum. EIP zawierają specyfikacje techniczne proponowanych zmian i działają jako „źródło prawdy” dla społeczności. Ulepszenia sieci i normy jej stosowania są omawiane i rozwijane w ramach procesu EIP.

Każdy w społeczności Ethereum ma możliwość stworzenia EIP. Wytyczne dotyczące pisania EIP są zawarte w [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP powinna przede wszystkim zawierać zwięzłą specyfikację techniczną z niewielką ilością motywacji. Autor EIP jest odpowiedzialny za osiągnięcie konsensusu w społeczności i udokumentowanie odmiennych opinii. Ze względu na wysoką barierę techniczną związaną z wysłaniem dobrze sformatowanej propozycji EIP większość autorów EIP to zazwyczaj deweloperzy aplikacji lub protokołów.

## Dlaczego EIP mają znaczenia? {#why-do-eips-matter}

EIP odgrywają kluczową rolę w tym, jak zachodzą zmiany i są udokumentowane na Ethereum. Stanowią one dla ludzi drogę do zaproponowania, debaty i przyjęcia zmian. Istnieją [różne typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), w tym podstawowe EIP dotyczące zmian protokołu niskiego poziomu, które wpływają na konsensus i wymagają uaktualnienia sieci, takie jak [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), oraz prośby ERC dotyczące standardów aplikacji, takie jak [EIP-20](https://eips.ethereum.org/EIPS/eip-20) i [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Każde uaktualnienie sieci składa się z zestawu propozycji EIP, które muszą zostać zaimplementowane przez każdego [klienta Ethereum](/learn/#clients-and-nodes) w sieci. To znaczy, że aby utrzymać konsensus z innymi klientami w sieci głównej Ethereum, deweloperzy klientów muszą upewnić się, że wszyscy wdrożyli wymagane EIP.

Wraz z dostarczeniem specyfikacji technicznej zmian, EIP są jednostką, wokół której odbywa się zarządzanie w Ethereum: każdy może zaproponować jeden, a następnie różni interesariusze w społeczności będą debatować, aby ustalić, czy powinien zostać przyjęty jako standard, czy włączony do aktualizacja sieci. Jako że EIP inne niż podstawowe nie muszą być przyjęte przez wszystkie aplikacje (na przykład można utworzyć zamienny token, który nie implementuje propozycji EIP-20), ale podstawowe EIP muszą być powszechnie przyjęte (ponieważ wszystkie węzły muszą się uaktualnić, aby pozostać częścią tej samej sieci), podstawowe EIP wymagają szerszego konsensusu w społeczności niż EIP inne niż podstawowe.

## Historia EIP {#history-of-eips}

[Repozytorium Github Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) zostało stworzone w październiku 2015 r. Proces EIP opiera się na procesie [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), który sam w sobie opiera się na [Python Enhancement Proposals (PEP)](https: //www.python.org/dev/peps/).

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

Jeśli chcesz zostać edytorem EPI, sprawdź [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Edytorzy EPI decydują, kiedy propozycja jest gotowa, aby stać się EIP, i pomagają autorom EPI w realizacji ich propozycji. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) pomagają w organizowaniu spotkań edytorów EIP ze społecznością (patrz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Pełny proces normalizacji wraz ze schematem jest opisany w [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Dowiedz się więcej {#learn-more}

Jeśli chcesz dowiedzieć się więcej na temat EPI, sprawdź [witrynę internetową propozycji EPI](https://eips.ethereum.org/) i propozycję [EPI-1](https://eips.ethereum.org/EIPS/eip-1). Oto kilka przydatnych linków:

- [Lista wszystkich propozycji ulepszeń Ethereum](https://eips.ethereum.org/all)
- [Opis wszystkich typów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Opis wszystkich statusów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projekty edukacyjne dla społeczności {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP to seria filmów edukacyjnych, która przedstawia propozycje ulepszeń Ethereum (EIP) oraz kluczowe cechy przyszłych uaktualnień.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds zapewnia obszerne przeglądy różnych propozycji ulepszeń Ethereum (EIP) w stylu ELI5, w tym podstawowych EIP oraz EIP warstwy aplikacji/infrastruktury (ERC), mające edukować czytelników i kształtować konsensus wokół proponowanych zmian w protokole Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf zapewnia dodatkowe informacje o propozycjach ulepszeń Ethereum (EIP), włącznie z ich statusem, szczegółami implementacji, powiązanymi żądaniami pull request oraz opiniami społeczności.*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun dostarcza najnowsze wiadomości o propozycjach ulepszeń Ethereum (EIP), aktualizacjach na temat spotkań EIP i nie tylko.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight to przedstawienie stanu procesu i statystyk propozycji ulepszeń Ethereum (EIP) zgodnie z informacjami zebranymi z różnych źródeł.*

## Uczestnictwo {#participate}

Każdy może utworzyć EIP. Przed przesłaniem propozycji należy przeczytać [EIP-1](https://eips.ethereum.org/EIPS/eip-1), w której opisano proces EIP i sposób pisania EIP, a także zasięgnąć opinii na stronie [Ethereum Magicians](https://ethereum-magicians.org/), na której propozycje są najpierw omawiane ze społecznością przed złożeniem projektu.

## Źródła {#references}

<cite class="citation">

Zawartość strony dostarczona w części z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) przez Hudsona Jamesona

</cite>
