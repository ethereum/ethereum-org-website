---
title: Wprowadzenie do propozycji ulepszeń Ethereum (EIP)
metaTitle: Propozycje ulepszeń Ethereum (EIP)
description: Podstawowe informacje potrzebne do zrozumienia EIP
lang: pl
---

## Czym są EIP? {#what-are-eips}

[Propozycje ulepszeń Ethereum (EIP)](https://eips.ethereum.org/) to standardy określające potencjalne nowe funkcje lub procesy dla Ethereum. EIP zawierają specyfikacje techniczne proponowanych zmian i pełnią rolę „źródła prawdy” dla społeczności. Aktualizacje sieci i standardy aplikacji dla [Ethereum](/) są omawiane i rozwijane w ramach procesu EIP.

Każdy członek społeczności Ethereum ma możliwość utworzenia EIP. Wytyczne dotyczące pisania EIP są zawarte w [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP powinien przede wszystkim zawierać zwięzłą specyfikację techniczną z krótkim uzasadnieniem. Autor EIP jest odpowiedzialny za osiągnięcie konsensusu w społeczności i udokumentowanie alternatywnych opinii. Biorąc pod uwagę wysoką barierę techniczną dla przesłania dobrze sformułowanego EIP, historycznie większość autorów EIP to zazwyczaj programiści aplikacji lub protokołu.

## Dlaczego EIP są ważne? {#why-do-eips-matter}

EIP odgrywają kluczową rolę w tym, jak zmiany zachodzą i są dokumentowane w Ethereum. Są one sposobem na proponowanie, debatowanie i przyjmowanie zmian. Istnieją [różne typy EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), w tym główne EIP (core EIP) dla niskopoziomowych zmian protokołu, które wpływają na konsensus i wymagają aktualizacji sieci, takie jak [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), oraz ERC dla standardów aplikacji, takie jak [EIP-20](https://eips.ethereum.org/EIPS/eip-20) i [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Każda aktualizacja sieci składa się z zestawu EIP, które muszą zostać zaimplementowane przez każdego [klienta Ethereum](/learn/#clients-and-nodes) w sieci. Oznacza to, że aby pozostać w konsensusie z innymi klientami w sieci głównej Ethereum, programiści klientów muszą upewnić się, że zaimplementowali wszystkie wymagane EIP.

Oprócz dostarczania specyfikacji technicznej dla zmian, EIP są jednostką, wokół której odbywa się zarządzanie w Ethereum: każdy może zaproponować EIP, a następnie różni interesariusze w społeczności będą debatować, aby ustalić, czy powinien on zostać przyjęty jako standard lub włączony do aktualizacji sieci. Ponieważ EIP inne niż główne (non-core EIP) nie muszą być przyjmowane przez wszystkie aplikacje (na przykład możliwe jest utworzenie tokena zamiennego, który nie implementuje EIP-20), ale główne EIP muszą być powszechnie przyjęte (ponieważ wszystkie węzły muszą zostać zaktualizowane, aby pozostać częścią tej samej sieci), główne EIP wymagają szerszego konsensusu w społeczności niż EIP inne niż główne.

## Historia EIP {#history-of-eips}

Repozytorium [Ethereum Improvement Proposals (EIPs) na GitHub](https://github.com/ethereum/EIPs) zostało utworzone w październiku 2015 roku. Proces EIP opiera się na procesie [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips), który z kolei opiera się na procesie [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/).

Redaktorzy EIP mają za zadanie przeglądanie EIP pod kątem poprawności technicznej, problemów z formatowaniem oraz poprawianie pisowni, gramatyki i stylu kodu. Martin Becze, Vitalik Buterin, Gavin Wood i kilku innych byli pierwotnymi redaktorami EIP od 2015 do końca 2016 roku.

Obecni redaktorzy EIP to:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emerytowani redaktorzy EIP to:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Jeśli chciałbyś zostać redaktorem EIP, sprawdź [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Redaktorzy EIP decydują, kiedy propozycja jest gotowa, aby stać się EIP, i pomagają autorom EIP w posuwaniu ich propozycji naprzód. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) pomagają organizować spotkania między redaktorami EIP a społecznością (zobacz [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Pełny proces standaryzacji wraz ze schematem jest opisany w [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Dowiedz się więcej {#learn-more}

Jeśli jesteś zainteresowany przeczytaniem więcej o EIP, sprawdź [stronę internetową EIP](https://eips.ethereum.org/) oraz [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Oto kilka przydatnych linków:

- [Lista wszystkich propozycji ulepszeń Ethereum](https://eips.ethereum.org/all)
- [Opis wszystkich typów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Opis wszystkich statusów EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Społecznościowe projekty edukacyjne {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP to edukacyjna seria wideo, która omawia propozycje ulepszeń Ethereum (EIP) i kluczowe funkcje nadchodzących aktualizacji.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf dostarcza dodatkowych informacji na temat propozycji ulepszeń Ethereum (EIP), w tym ich statusu, szczegółów implementacji, powiązanych pull requestów i opinii społeczności.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun dostarcza najnowsze wiadomości na temat propozycji ulepszeń Ethereum (EIP), aktualizacje ze spotkań dotyczących EIP i wiele więcej.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight to reprezentacja stanu procesu propozycji ulepszeń Ethereum (EIP) i statystyk na podstawie informacji zebranych z różnych źródeł.*

## Weź udział {#participate}

Każdy może utworzyć EIP. Przed przesłaniem propozycji należy przeczytać [EIP-1](https://eips.ethereum.org/EIPS/eip-1), który opisuje proces EIP i sposób pisania EIP, a także poprosić o opinie na forum [Ethereum Magicians](https://ethereum-magicians.org/), gdzie propozycje są najpierw omawiane ze społecznością przed przesłaniem wersji roboczej.

## Źródła {#references}

<cite class="citation">

Treść strony pochodzi częściowo z [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) autorstwa Hudsona Jamesona

</cite>