---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Dowiedz się o aktualizacji protokołu Hegotá"
lang: pl
template: upgrade
---

Hegotá to aktualizacja sieci [Ethereum](/), która ma nastąpić po [Glamsterdam](/roadmap/glamsterdam/). Jej nazwa pochodzi z połączenia słów „Bogotá” (aktualizacja warstwy wykonawczej, nazwana na cześć poprzedniej lokalizacji Devcon) oraz „Heze” (aktualizacja warstwy konsensusu, nazwana na cześć gwiazdy).

Hegotá jest na wczesnym etapie planowania. Wybrano już jej główny element i zaplanowano drugą zmianę, ale reszta zakresu jest nadal ustalana i nie wyznaczono jeszcze żadnych dat.

## Główny element: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Wymuszone przez wybór rozwidlenia listy włączeń (Fork-choice enforced inclusion lists - FOCIL, lub EIP-7805) dotyczą [odporności na cenzurę](/roadmap/security/#censorship-resistance): upewnienia się, że ważna transakcja trafi do bloku, nawet jeśli osoby budujące bloki wolałyby ją pominąć.

Obecnie pojedynczy [walidator](/glossary/#validator) buduje każdy blok i decyduje, jakie transakcje się w nim znajdą. Każdy, kto może wpłynąć na wystarczającą liczbę budowniczych bloków, może zatem opóźnić transakcję, a użytkownik nie ma innego sposobu na wymuszenie jej przetworzenia niż czekanie i nadzieja.

FOCIL rozkłada tę decyzję na wielu walidatorów. Każdy komitet proponuje listę transakcji, które powinny zostać uwzględnione, a zasady protokołu zobowiązują budowniczego bloków do honorowania tych list. Cenzurowanie transakcji przestaje być czymś, co jedna strona może zrobić samodzielnie.

## Transakcje ramowe {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Transakcje ramowe (EIP-8141) pozwalają [kontu](/glossary/#account) samodzielnie decydować, co liczy się jako ważna transakcja, zamiast narzucania przez protokół jednego stałego schematu podpisu.

Obecnie każda transakcja jest autoryzowana w ten sam sposób: jeden podpis, z jednego klucza. [Konta inteligentnych kontraktów](/roadmap/account-abstraction/) omijają to, kierując transakcje przez dodatkową infrastrukturę, co kosztuje gaz i dodaje ruchome elementy, które mogą ulec awarii.

Transakcja ramowa przenosi to sprawdzenie do samego konta. Konto uruchamia własną logikę weryfikacji, więc możliwości, które obecnie wymagają tej dodatkowej infrastruktury — odzyskiwanie społecznościowe, limity wydatków, wymóg kilku zatwierdzeń, pozwolenie komuś innemu na opłacenie gazu — stają się funkcjami bezpośrednio wspieranymi przez protokół.

Ponieważ konto wybiera własne zasady, może również wybrać schemat podpisu, którego komputer kwantowy nie byłby w stanie złamać. Czyni to z tego krok w stronę [odporności kwantowej](/roadmap/security/#quantum-resistance), a także lepszych portfeli.

## Co jeszcze znajduje się w Hegotá {#scope}

Jeszcze nie zdecydowano. FOCIL i transakcje ramowe to dwie zmiany zaplanowane do tej pory; zaproponowano dziesiątki innych, ale żadna z nich nie została jeszcze ostatecznie zatwierdzona. Ta strona pozostanie krótka, dopóki zakres nie zostanie ustalony — aby poznać obecny stan dyskusji, zapoznaj się z poniższymi zasobami.

## Dalsza lektura {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — status każdej propozycji na żywo
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Specyfikacja techniczna EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Specyfikacja techniczna EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Mapa drogowa Ethereum](/roadmap/)
