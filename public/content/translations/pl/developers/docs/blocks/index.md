---
title: Bloki
description: Przegląd bloków w blockchainie Ethereum – ich struktura danych, dlaczego są potrzebne i jak są wytwarzane.
lang: pl
---

Bloki są zestawami transakcji z kryptograficznym skrótem poprzedniego bloku w łańcuchu. Łączy to bloki (w łańcuch), ponieważ skróty są kryptograficznymi pochodnymi danych umieszczanych w blokach. Zapobiega to nadużyciom, ponieważ pojedyncza zmiana w dowolnym, historycznym bloku unieważniłaby wszystkie bloki następujące po nim, gdyż zmianie uległyby kolejne kryptograficzne skróty, co wychwyciłby każdy, kto korzysta z blokchaina.

## Wymagania wstępne {#prerequisites}

Bloki to temat przyjazny dla nowicjuszy. Jednak, aby pomóc ci w lepszym zrozumieniu tej strony, zalecamy najpierw przeczytać o [kontach](/developers/docs/accounts/), [transakcjach](/developers/docs/transactions/), a także nasze [Wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Dlaczego bloki? {#why-blocks}

Aby zagwarantować, że wszyscy uczestnicy sieci Ethereum pozostają w zsynchronizowanym stanie i zgadzają się odnośnie do dokładnej historii transakcji, grupujemy transakcje w blokach. Oznacza to, że dziesiątki (lub setki) transakcji są zatwierdzane, uzgadniane i synchronizowane jednocześnie.

![Diagram przedstawiający transakcję w bloku, która powoduje zmiany stanu](./tx-block.png) _Diagram zaadaptowany z [Ilustrowanego Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Dzięki rozgraniczaniu zatwierdzeń (transakcji zatwierdzeniowych) dajemy wszystkim uczestnikom sieci wystarczający zapas czasu, aby osiągnęli konsensus: nawet jeżeli żądania transakcyjne nadchodzą z częstotliwością kilku na sekundę, każdy jeden blok Ethereum jest zatwierdzany co około piętnaście sekund.

## Jak działają bloki {#how-blocks-work}

Aby zachować historię transakcji, bloki są ściśle uporządkowane (każdy nowy blok zawiera odniesienie do bloku nadrzędnego), podobnie ściśle uporządkowane są transakcje wewnątrz bloków. Poza rzadkimi przypadkami w każdym dowolnym momencie wszyscy uczestnicy sieci uzgadniają dokładną liczbę i historię bloków, pracują również nad tym, aby grupować bieżące żądania transakcji w następnym bloku.

Gdy dany blok jest już złożony (wydobyty) przez jakiegoś górnika w sieci, jest rozprowadzany do reszty sieci; wszystkie węzły dodają ten blok na koniec swojego blockchaina, a wydobywanie trwa nadal. Dokładny proces składania (wydobywania) bloków, jak i proces zatwierdzania/konsensusu, są obecnie określone protokołem "proof-of-work" sieci Ethereum.

### Demo wizualne {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protokół proof-of-work (dowodu wykonanej pracy) {#proof-of-work-protocol}

Proof-of-work oznacza, że:

- Węzły wydobywcze muszą zużyć zmienne acz znaczne ilości energii, czasu i mocy obliczeniowej, aby wyprodukować „certyfikat legalności” dla bloku, który proponują sieci. Pomaga to w ochronie sieci m.in. przed spamem/atakami typu denial-of-service, ponieważ produkcja certyfikatów obarczona jest dużym kosztem.
- Inni górnicy, którzy dowiadują się o nowym bloku z ważnym certyfikatem legalności, muszą go zaakceptować jako kolejny, obowiązujący blok w blockchainie.
- Dokładna ilość czasu potrzebnego każdemu górnikowi, aby wytworzył certyfikat, jest zmienną losową o dużej wariancji. Gwarantuje to, że będzie mało prawdopodobne, aby dwaj górnicy równocześnie dokonali walidacji zaproponowanych, kolejnych bloków; gdy górnik produkuje i rozprowadza nowy, certyfikowany blok, może być pewien, że zostanie on zaakceptowany przez sieć jako następny, obowiązujący blok w łańcuchu, bez konfliktu (chociaż istnieje protokół służący do radzenia sobie z konfliktami, podobnie jak z sytuacjami, gdy dwa łańcuchy certyfikowanych bloków powstaną niemal w tym samym czasie).

[Więcej o wydobywaniu](/developers/docs/consensus-mechanisms/pow/mining/)

## Co znajduje się w bloku? {#block-anatomy}

- znacznik czasowy – czas wydobycia bloku;
- numer bloku – długość łańcucha bloków wyrażona w blokach;
- trudność – wysiłek potrzebny do wydobycia bloku;
- mixHash – unikatowy identyfikator bloku;
- nadrzędny skrót kryptograficzny (ang. hash) – unikatowy identyfikator bloku poprzedzającego bieżący (w ten sposób bloki są łączone w łańcuch);
- lista transakcji – transakcje umieszczone w bloku;
- źródło stanu – stan całego systemu zawierającego: salda kont, magazyn kontraktów, kod kontraktów i jednokrotki (ang. nonces) kont;
- jednokrotka – kryptograficzny skrót, który – gdy zespolimy go z wartością mixHash – jest dowodem na fakt przejścia przez blok procesu [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

## Rozmiar bloku {#block-size}

Ważna uwaga na zakończenie jest taka, że same bloki są ograniczone pod względem rozmiaru. Każdy blok wyposażony jest w limit paliwa, który ustalany jest wspólnie przez górników i sieć: całkowita ilość paliwa zużyta przez wszystkie transakcje w bloku musi być mniejsza od tego limitu. Jest to o tyle ważne, że gwarantuje, iż bloki nie mogą być dowolnie duże. Gdyby bloki mogły mieć dowolną wielkość, wtedy mniej wydajne, pełne węzły stopniowo przestawałyby nadążać za siecią z powodu wymogów odnośnie do przestrzeni i prędkości. Limit paliwowy bloku 0 został zainicjowany wartością 5000; każdy górnik, który wydobywa nowy blok może zmienić limit paliwowy względem limitu w bloku nadrzędnym do około 0,1% w każdą ze stron. Od listopada 2018 do dziś limit paliwowy wynosi około 8 000 000.

## Dalsza lektura {#further-reading}

_Znasz jakiś zasób społecznościowy, który ci pomógł? Wyedytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transakcje](/developers/docs/transactions/)
- [Paliwo](/developers/docs/gas/)
