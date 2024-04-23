---
title: Inteligentne kontrakty
description: Wprowadzenie do inteligentnych kontraktów w wersji nietechnicznej
lang: pl
---

# Wprowadzenie do inteligentnych kontraktów {#introduction-to-smart-contracts}

Inteligentne kontrakty są podstawowymi elementami składowymi warstwy aplikacji Ethereum. They are computer programs stored on the [blockchain](/glossary/#blockchain) that follow "if this then that" logic, and are guaranteed to execute according to the rules defined by its code, which cannot be changed once created.

Termin „inteligentny kontrakt” stworzył Nick Szabo. W 1994 r. napisał [wprowadzenie do tej koncepcji](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), a w 1996 r. opisał [badania na temat możliwości inteligentnych kontraktów i tego co mogą zrobić](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo envisioned a digital marketplace where automatic, [cryptographically-secure](/glossary/#cryptography) processes enable transactions and business functions to happen without trusted intermediaries. Inteligentne kontrakty na Ethereum wprowadzają tę wizję w życie.

Zobacz, jak Finematics tłumaczy inteligentne kontrakty:

<YouTube id="pWGLtjG-F5c" />

## Zaufanie do konwencjonalnych kontraktów {#trust-and-contracts}

Jednym z największych problemów związanych z tradycyjnym kontraktem jest konieczność przestrzegania jego postanowień przez zaufane osoby.

Oto przykład:

Alicja i Bob urządzają sobie wyścig rowerowy. Załóżmy, że Alice założyła się z Bobem o 10 dolarów, że wygra wyścig. Bob jest przekonany, że to on będzie zwycięzcą, i przyjmuje zakład. Jednak Alice kończy wyścig znacznie przed Bobem i zdecydowanie wygrywa. Bob jednak odmawia wypłacenia pieniędzy z zakładu, twierdząc, że Alicja musiała oszukiwać.

Ten jaskrawy przykład ilustruje problem z dowolną umową nieinteligentną. Nawet jeśli warunki umowy zostaną spełnione (np. Ty jesteś zwycięzcą wyścigu), nadal musisz ufać innej osobie, że wywiąże się z umowy (np. wypłaci zakład).

## Cyfrowy automat do sprzedaży {#vending-machine}

Prostą metaforą inteligentnego kontraktu jest automat sprzedający, który działa nieco podobnie do inteligentnego kontraktu — określone wejścia gwarantują z góry określone wyjścia.

- Wybierasz produkt.
- Automat sprzedający wyświetla cenę
- Płacisz cenę
- Automat weryfikuje, czy osoba zapłaciła odpowiednią kwotę
- Automat daje ci twój przedmiot

Automat wyda żądany produkt dopiero po spełnieniu wszystkich wymagań. Jeśli nie wybierzesz produktu lub nie umieścisz wystarczającej ilości pieniędzy, automat sprzedający nie wyda produktu.

## Automatyczne wykonanie {#automation}

Główną zaletą inteligentnego kontraktu jest to, że deterministycznie wykonuje on jednoznaczny kod po spełnieniu określonych warunków. Nie ma potrzeby czekania, aż człowiek zinterpretuje lub wynegocjuje wynik. Eliminuje to potrzebę korzystania z zaufanych pośredników.

Można na przykład napisać inteligentny kontrakt, który przechowuje środki finansowe na rzecz dziecka, umożliwiając mu wypłatę środków po określonej dacie. Jeśli spróbują wypłacić przed tą datą, inteligentny kontrakt nie zostanie wykonany. Możesz też napisać kontrakt, który automatycznie udostępni Ci cyfrową wersję tytułu własności samochodu, gdy zapłacisz sprzedawcy.

## Przewidywalne wyniki {#predictability}

Tradycyjne kontrakty są niejednoznaczne, ponieważ polegają na interpretacji i realizacji zależnej od człowieka. Na przykład, dwóch sędziów może różnie interpretować kontrakt, co może prowadzić do niespójnych decyzji i niejednakowych wyników. Inteligentne kontrakty usuwają tę możliwość. Zamiast tego, inteligentne kontrakty wykonują dokładnie to, co zostało zapisane w kodzie kontraktu. Dokładność ta oznacza, że w takich samych okolicznościach inteligentny kontrakt wygeneruje taki sam wynik.

## Rekord publiczny {#public-record}

Inteligentne kontrakty są przydatne do celów kontroli i śledzenia. Ponieważ inteligentne kontrakty Ethereum znajdują się w publicznym blockchainie, każdy może natychmiast śledzić transfery aktywów i inne powiązane informacje. Możesz na przykład sprawdzić, czy ktoś wysłał pieniądze na Twój adres.

## Ochrona prywatności {#privacy-protection}

Inteligentne kontrakty chronią również Twoją prywatność. Ponieważ Ethereum jest siecią pseudonimową (Twoje transakcje są związane publicznie z unikalnym adresem kryptograficznym, a nie z Twoją tożsamością), możesz chronić swoją prywatność przed obserwatorami.

## Widoczne terminy {#visible-terms}

Wreszcie, podobnie jak w przypadku tradycyjnych kontraktów, możesz sprawdzić, co jest w inteligentnym kontrakcie, zanim go podpiszesz (lub wejdziesz z nim w interakcje w inny sposób). Przejrzystość inteligentnego kontraktu gwarantuje, że każdy może go przeanalizować.

## Przykłady wykorzystania inteligentnych kontraktów {#use-cases}

Inteligentne kontrakty mogą robić zasadniczo wszystko, co robią programy komputerowe.

They can perform computations, create currency, store data, mint [NFTs](/glossary/#nft), send communications and even generate graphics. Oto kilka popularnych, rzeczywistych przykładów:

- [Stablecoiny](/stablecoins/)
- [Tworzenie i dystrybucja unikalnych zasobów cyfrowych](/nft/)
- [Automatyczna otwarta wymiana walut](/get-eth/#dex)
- [Zdecentralizowane gry](/dapps/?category=gaming#explore)
- [Polisa ubezpieczeniowa automatycznie wypłacająca odszkodowanie](https://etherisc.com/)
- [Standard umożliwiający tworzenie niestandardowych, interoperacyjnych walut](/developers/docs/standards/tokens/)

## Dalsza lektura {#further-reading}

- [Jak inteligentne kontrakty zmienią świat](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Inteligentne kontrakty: Technologia łańcucha bloków, która zastąpi prawników](https://blockgeeks.com/guides/smart-contracts/)
- [Inteligentne kontrakty dla programistów](/developers/docs/smart-contracts/)
- [Naucz się pisać inteligentne kontrakty](/developers/learning-tools/)
- [Mastering Ethereum - Co to jest inteligentny kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
