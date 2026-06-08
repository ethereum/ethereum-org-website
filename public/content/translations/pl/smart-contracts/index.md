---
title: Wprowadzenie do inteligentnych kontraktów
metaTitle: "Inteligentne kontrakty: Czym są i jakie mają zalety"
description: Nietechniczne wprowadzenie do inteligentnych kontraktów
lang: pl
---

Inteligentne kontrakty to podstawowe bloki budulcowe warstwy aplikacji [Ethereum](/). Są to programy komputerowe przechowywane na [blockchainie](/glossary/#blockchain), które działają zgodnie z logiką „jeśli to, to tamto” i mają gwarancję wykonania zgodnie z zasadami określonymi w ich kodzie, którego nie można zmienić po utworzeniu.

Nick Szabo ukuł termin „inteligentny kontrakt”. W 1994 roku napisał [wprowadzenie do tej koncepcji](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), a w 1996 roku [analizę tego, co inteligentne kontrakty mogłyby robić](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo wyobrażał sobie cyfrowy rynek, na którym automatyczne, [zabezpieczone kryptograficznie](/glossary/#cryptography) procesy umożliwiają realizację transakcji i funkcji biznesowych bez zaufanych pośredników. Inteligentne kontrakty na Ethereum wprowadzają tę wizję w życie.

Zobacz, jak Finematics wyjaśnia inteligentne kontrakty:

<VideoWatch slug="smart-contracts-code-is-law" />

## Zaufanie w tradycyjnych kontraktach {#trust-and-contracts}

Jednym z największych problemów z tradycyjnym kontraktem jest potrzeba zaufanych osób, które dopilnują realizacji jego postanowień.

Oto przykład:

Alicja i Bob ścigają się na rowerach. Załóżmy, że Alicja zakłada się z Bobem o 10 dolarów, że wygra wyścig. Bob jest pewien, że to on będzie zwycięzcą i zgadza się na zakład. Ostatecznie Alicja kończy wyścig daleko przed Bobem i jest bezdyskusyjną zwyciężczynią. Jednak Bob odmawia wypłaty wygranej, twierdząc, że Alicja musiała oszukiwać.

Ten banalny przykład ilustruje problem z każdą umową, która nie jest inteligentnym kontraktem. Nawet jeśli warunki umowy zostaną spełnione (tj. jesteś zwycięzcą wyścigu), nadal musisz ufać innej osobie, że wywiąże się z umowy (tj. wypłaci wygraną z zakładu).

## Cyfrowy automat sprzedający {#vending-machine}

Prostą metaforą inteligentnego kontraktu jest automat sprzedający, który działa w pewnym sensie podobnie do inteligentnego kontraktu – określone dane wejściowe gwarantują z góry określone wyniki.

- Wybierasz produkt
- Automat wyświetla cenę
- Płacisz cenę
- Automat weryfikuje, czy zapłaciłeś odpowiednią kwotę
- Automat wydaje Ci Twój przedmiot

Automat wyda pożądany produkt tylko po spełnieniu wszystkich wymagań. Jeśli nie wybierzesz produktu lub nie wrzucisz wystarczającej ilości pieniędzy, automat nie wyda produktu.

## Automatyczne wykonanie {#automation}

Główną zaletą inteligentnego kontraktu jest to, że deterministycznie wykonuje jednoznaczny kod po spełnieniu określonych warunków. Nie ma potrzeby czekać, aż człowiek zinterpretuje lub wynegocjuje wynik. Eliminuje to potrzebę korzystania z zaufanych pośredników.

Na przykład, możesz napisać inteligentny kontrakt, który przechowuje środki w depozycie dla dziecka, pozwalając mu na ich wypłatę po określonej dacie. Jeśli spróbuje wypłacić je przed tą datą, inteligentny kontrakt nie zostanie wykonany. Możesz też napisać kontrakt, który automatycznie przekaże Ci cyfrową wersję aktu własności samochodu, gdy zapłacisz dealerowi.

## Przewidywalne wyniki {#predictability}

Tradycyjne kontrakty są niejednoznaczne, ponieważ opierają się na ludziach, którzy je interpretują i wdrażają. Na przykład dwóch sędziów może zinterpretować kontrakt inaczej, co może prowadzić do niespójnych decyzji i nierównych wyników. Inteligentne kontrakty eliminują taką możliwość. Zamiast tego inteligentne kontrakty wykonują się precyzyjnie w oparciu o warunki zapisane w kodzie kontraktu. Ta precyzja oznacza, że w tych samych okolicznościach inteligentny kontrakt zawsze wygeneruje ten sam wynik.

## Rejestr publiczny {#public-record}

Inteligentne kontrakty są przydatne do audytów i śledzenia. Ponieważ inteligentne kontrakty Ethereum znajdują się na publicznym blockchainie, każdy może natychmiast śledzić transfery aktywów i inne powiązane informacje. Na przykład możesz sprawdzić, czy ktoś wysłał pieniądze na Twój adres.

## Ochrona prywatności {#privacy-protection}

Inteligentne kontrakty chronią również Twoją prywatność. Ponieważ Ethereum jest siecią pseudonimową (Twoje transakcje są publicznie powiązane z unikalnym adresem kryptograficznym, a nie z Twoją tożsamością), możesz chronić swoją prywatność przed obserwatorami.

## Widoczne warunki {#visible-terms}

Wreszcie, podobnie jak w przypadku tradycyjnych kontraktów, możesz sprawdzić, co znajduje się w inteligentnym kontrakcie, zanim go podpiszesz. W przeciwieństwie do tradycyjnego kontraktu, przejrzystość inteligentnego kontraktu onchain pozwala każdemu na jego dokładne zbadanie i przejrzenie przed wejściem z nim w interakcję. 

Jednakże, chociaż każdy może zobaczyć warunki inteligentnego kontraktu, surowe dane transakcji są zaprojektowane tak, aby były interpretowane przez aplikacje i portfele, a nie przez ludzi. Ponieważ te dane są tak trudne do odczytania, użytkownicy często stają w obliczu poważnego ryzyka bezpieczeństwa zwanego „ślepym podpisywaniem” (ang. blind signing), czyli zatwierdzaniem transakcji, która wchodzi w interakcję z inteligentnym kontraktem, bez faktycznego zrozumienia, co ona zrobi. 

Ekosystem Ethereum przechodzi na standardy **[jasnego podpisywania](https://clearsigning.org/)** (ang. Clear Signing, w szczególności [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). Jasne podpisywanie tłumaczy nieprzejrzyste dane inteligentnego kontraktu na proste, czytelne dla człowieka opisy transakcji, zapewniając, że każdy może zrozumieć prawdziwą intencję kontraktu przed jego podpisaniem.

## Przypadki użycia inteligentnych kontraktów {#use-cases}

Inteligentne kontrakty mogą robić w zasadzie wszystko to, co programy komputerowe.

Mogą wykonywać obliczenia, tworzyć walutę, przechowywać dane, wybijać [NFT](/glossary/#nft), wysyłać komunikaty, a nawet generować grafikę. Oto kilka popularnych przykładów z prawdziwego świata:

- [Stablecoiny](/stablecoins/)
- [Tworzenie i dystrybucja unikalnych zasobów cyfrowych](/nft/)
- [Automatyczna, otwarta wymiana walut](/get-eth/#dex)
- [Zdecentralizowane gry](/apps/categories/gaming)
- [Polisa ubezpieczeniowa, która wypłaca środki automatycznie](https://etherisc.com/)
- [Standard, który pozwala ludziom tworzyć spersonalizowane, interoperacyjne waluty](/developers/docs/standards/tokens/)

## Dalsza lektura {#further-reading}

- [Jak inteligentne kontrakty zmienią świat](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Inteligentne kontrakty dla deweloperów](/developers/docs/smart-contracts/)
- [Naucz się pisać inteligentne kontrakty](/developers/learning-tools/)
- [Mastering Ethereum – Czym jest inteligentny kontrakt?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />