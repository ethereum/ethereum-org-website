---
title: "Podstawy Ethereum: wprowadzenie"
description: "Wykład wprowadzający do podstaw Ethereum, omawiający czym jest Ethereum, czym różni się od Bitcoina oraz podstawowe koncepcje, na których opiera się sieć Ethereum."
lang: pl
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Podstawy Ethereum"
---

Wykład wprowadzający autorstwa **Quezara** omawiający podstawy Ethereum, w tym czym są blockchainy, jak działają od kuchni oraz kluczowe komponenty tworzące sieć Ethereum.

*Ten transkrypt jest przystępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=j78ZcIIpi0Q) opublikowanego przez Quezara. Został on lekko zredagowany w celu poprawy czytelności.*

#### Powitanie i przegląd serii (0:03) {#welcome-and-series-overview-003}

Witamy ponownie w kolejnej części serii o Ethereum. Jeśli szukałeś dobrego źródła, aby zrozumieć, jak Ethereum działa od kuchni, to dobrze trafiłeś. W poprzedniej części omówiliśmy, jak czytać i pisać podstawowe kontrakty w Solidity, a także krótko omówiliśmy kilka kwestii dotyczących różnych komponentów tworzących sieć Ethereum. W tej części przyjrzymy się bliżej architekturze Ethereum i omówimy każdy komponent znacznie bardziej szczegółowo. Wkrótce pojawi się o wiele więcej filmów, więc jeśli podoba Ci się tego typu treść, kliknij przycisk „Lubię to” i zasubskrybuj, aby otrzymywać powiadomienia o nowych filmach.

#### Cele i wymagania wstępne (0:40) {#goals-and-prerequisites-040}

Celem tej części serii jest zapewnienie dobrego zrozumienia architektury Ethereum w ciągu tygodnia. Podobnie jak w przypadku poprzedniej części, ustrukturyzowałem ją tak, aby w ciągu siedmiu dni znacznie swobodniej poruszać się we wszystkim, co dzieje się w sieci Ethereum, gdy ktoś wykonuje w niej jakąś aktywność.

Mówiąc o wymaganiach wstępnych — nie ma niczego, co musiałbyś już wiedzieć. Jeśli oglądasz ten film, to najprawdopodobniej wiesz wystarczająco dużo o sieci Ethereum, jeśli chodzi o tę część. Polecam jednak ukończenie poprzedniej części serii — Podstawy Solidity — ponieważ ma ona znacznie bardziej praktyczny charakter. Możesz uruchomić kod w Remix IDE i zobaczyć, jak to wszystko faktycznie działa w sieci Ethereum. Ta część będzie w dużej mierze teoretyczna, a jeśli masz już za sobą poprzednią część, znacznie łatwiej będzie Ci przez nią przejść.

#### Co omówimy (1:41) {#what-well-cover-141}

W tej części omówimy, czym są blockchainy i zobaczymy, jak działają od kuchni. Zobaczymy również, jakie komponenty tworzą sieć Ethereum, a następnie przejdziemy dalej i omówimy każdy z nich znacznie bardziej szczegółowo.

W tej części oparłem się na oficjalnej dokumentacji Ethereum. Po zapoznaniu się z tą częścią, będziesz miał opanowaną większość podstawowych tematów z tej dokumentacji. Znacznie łatwiej będzie Ci przez nią przebrnąć. Oczywiście nie wszystko znajduje się w filmach, ale starałem się omówić wszystkie kwestie na wyższym poziomie ogólności. Możesz potraktować tę część jako wprowadzenie do dokumentacji, która jest znacznie bardziej szczegółowa.

#### Narzędzia i podejście (2:30) {#tools-and-approach-230}

Będziemy również używać Etherscan, aby zobaczyć, jak każdy komponent działa w czasie rzeczywistym. Nie martw się, jeśli nie zrozumiesz wszystkiego za pierwszym razem — zawsze możesz wrócić do konkretnych tematów, kiedy tylko zechcesz. Polecam robienie krótkich przerw po każdym temacie, aby móc je lepiej przyswoić. Zacznijmy więc od zrozumienia, czym są blockchainy.