---
title: Wydobycie
description: Wyjaśnienie jak kopanie działało na Ethereum.
lang: pl
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
proof-of-work nie jest już podstawowym mechanizmem konsensusu Ethereum, co oznacza, że kopanie zostało wyłączone. Zamiast tego, sieć Ethereum jest zabezpieczona przez walidatorów, którzy stakują ETH. Możesz zacząć stakować swoje ETH już dziś. Przeczytaj więcej na <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a>, oraz <a href='/staking/'>staking</a>. Ta strona ma charakter wyłącznie historyczny.
</AlertDescription>
</AlertContent>
</Alert>

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) i [mechanizmem proof-of-work](/developers/docs/consensus-mechanisms/pow/).

## Czym jest wydobycie w Ethereum? {#what-is-ethereum-mining}

Kopanie to proces tworzenia bloków transakcji, które mają być dodane do łańcucha bloków Ethereum w obecnie przestarzałej architekturze proof-of-work.

Słowo kopanie pochodzi z kontekstu analogii złota i kryptowalut. Złoto czy metale szlachetne są ograniczone tak samo, jak cyfrowe tokeny a jedynym sposobem na zwiększenie łącznej objętości w systemie proof-of-work jest kopanie. W modelu Ethereum proof-of-stake jedynym sposobem na zwiększenie podaży było kopanie. Jednak w przeciwieństwie do metali szlachetnych czy złota, kopanie Ethereum było również sposobem na zabezpieczenie sieci przez tworzenie, weryfikację, publikowanie i propagowanie bloków w łańcuchu bloków.

Kopanie eteru = zabezpieczanie sieci

Kopanie jest podstawą każdego łańcucha bloków opartego na proof-of-work. Górnicy Ethereum — komputery z uruchomionym oprogramowaniem — używali swojego czasu i mocy obliczeniowej do przetwarzania transakcji i produkowania bloków przed przejściem na proof-of-stake.

## Dlaczego górnicy istnieją? {#why-do-miners-exist}

W zdecentralizowanych systemach, takich jak Ethereum, musimy dopilnować, aby wszyscy zgodzili się na kolejność transakcji. Górnicy pomagali w tym poprzez rozwiązywanie wymagających obliczeniowo zagadek, aby wyprodukować bloki, zabezpieczyć sieć przed atakami.

[Więcej o mechanizmie proof-of-work](/developers/docs/consensus-mechanisms/pow/)

Każdy mógł wcześniej kopać na sieci Ethereum używające swojego komputera. Jednakże nie każdy mógł kopać eter (ETH) zyskownie. W większości przypadków górnicy musieli kupować dedykowany sprzęt komputerowy i mieć dostęp do niedrogich źródeł energii. Przeciętny komputer miał niewielkie szanse, aby zdobyć wystarczająco dużo nagród blokowych, żeby pokryć koszty związane z kopaniem.

### Koszt wydobycia {#cost-of-mining}

- Potencjalne koszty sprzętu niezbędnego do budowy i utrzymania statku górniczego
- Koszt elektryczny zasilania statku górniczego
- Kiedy kopałeś za pośrednictwem poola, pobierał on zwykle określoną stałą opłatę procentową od każdego bloku wygenerowanego przez pool
- Środki te przeznaczone są na pokrycie wydatków na personel i wydatków administracyjnych Agencji (tytuły 1 i 2) oraz jej wydatków operacyjnych związanych z programem prac (tytuł 3).

Aby dalej badać rentowność wydobycia, użyj kalkulatora wydobycia, takiego jak ten dostarczany przez [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jak wydobywano transakcje Ethereum {#how-ethereum-transactions-were-mined}

Treść poniżej daje ogląd na to, w jaki sposób transakcje były kopane w Ethereum proof-of-work. Analogiczny opis tego procesu dla mechanizmu proof-of-stake w Ethereum można znaleźć [tutaj](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Użytkownik tworzy i podpisuje żądanie [transakcji](/developers/docs/transactions/) kluczem prywatnym jakiegoś [konta](/developers/docs/accounts/).
2. Użytkownik rozgłasza żądanie transakcji do całej sieci Ethereum z jakiegoś [węzła](/developers/docs/nodes-and-clients/).
3. Po usłyszeniu o nowym żądaniu transakcji, każdy węzeł w sieci Ethereum dodaje żądanie do swojej lokalnej pamięci, listy wszystkich żądań transakcji, o których słyszał, a które nie zostały jeszcze zatwierdzone do blockchaina w bloku.
4. W pewnym momencie węzeł wydobywczy agreguje kilkadziesiąt lub kilkaset żądań transakcji w potencjalny [blok](/developers/docs/blocks/) w sposób, który maksymalizuje zarabiane przez niego [opłaty transakcyjne](/developers/docs/gas/), jednocześnie nie przekraczając limitu gazu bloku. Następnie węzeł wydobywczy:
   1. Weryfikuje ważność każdego żądania transakcji (tzn. nikt nie próbuje przelać etheru z konta, dla którego nie ma podpisu, żądanie nie jest nieprawidłowe itp.), a następnie wykonuje kod żądania, zmieniając stan swojej lokalnej kopii EVM. Górnik otrzymuje opłatę transakcyjną za każde takie żądanie transakcji na własny rachunek.
   2. Rozpoczyna proces tworzenia "certyfikatu legalności" proof-of-work dla potencjalnego bloku po zweryfikowaniu i wykonaniu wszystkich żądań transakcji w bloku na lokalnej kopii EVM.
5. W końcu górnik zakończy produkcję certyfikatu dla bloku, który zawiera nasze konkretne żądanie transakcji. Górnik następnie emituje wypełniony blok, który zawiera certyfikat i sumę kontrolną żądanego nowego stanu EVM.
6. Inne węzły słyszą o nowym bloku. Weryfikują certyfikat, samodzielnie wykonują wszystkie transakcje na bloku (w tym transakcję oryginalnie wyemitowaną przez naszego użytkownika) i sprawdzają, czy suma kontrolna ich nowego stanu EVM po wykonaniu wszystkich transakcji jest zgodna z sumą kontrolną stanu zgłaszanego przez blok górnika. Dopiero wtedy węzły dołączają ten blok do ogona swojego blokchaina i akceptują nowy stan EVM jako stan kanoniczny.
7. Każdy węzeł usuwa wszystkie transakcje w nowym bloku z lokalnej pamięci niespełnionych żądań transakcji.
8. Nowe węzły dołączające do sieci pobierają kolejno wszystkie bloki, w tym blok zawierający naszą interesującą transakcję. Inicjują lokalną kopię EVM (która zaczyna się jako EVM w stanie pustym), a następnie przechodzą przez proces wykonywania każdej transakcji w każdym bloku na wierzchu ich lokalnej kopii EVM, weryfikując po drodze sumy kontrolne stanu w każdym bloku.

Każda transakcja jest wydobywana (zawarta w nowym bloku i po raz pierwszy propagowana) jednorazowo, ale wykonywana i weryfikowana przez każdego uczestnika procesu przechodzenia do stanu kanonicznego EVM. To podkreśla jedną z głównych mantr blockchain: **Nie ufaj, weryfikuj**.

## Bloki Ommer (wujkowe) {#ommer-blocks}

Kopanie bloków w proof-of-work było probabilistyczne w takim sensie, że czasem dwa ważne bloki opublikowane były w tym samym czasie w wyniku opóźnienia sieci. W tym przypadku protokół musiał określić najdłuższy (i tym samym najbardziej "ważny") łańcuch, jednocześnie zapewniając sprawiedliwość wobec górników poprzez częściowe obdarowanie zaproponowanego ważnego bloku, który ostatecznie nie został zamieszczony. Zachęcało to do dalszej decentralizacji sieci, ponieważ mniejsi górnicy, którzy mogli doświadczać większych opóźnień, wciąż mogli generować zyski poprzez nagrody za bloki [ommer](/glossary/#ommer).

Termin „ommer” jest preferowanym pojęciem neutralnym pod względem płci dla rodzeństwa bloku macierzystego, ale czasami używa się także nazwy „wujek”. **Odkąd Ethereum przeszło na mechanizm proof-of-stake, bloki ommer nie są już wydobywane**, ponieważ w każdym slocie wybierany jest tylko jeden proponujący. Możesz zobaczyć tę zmianę, przeglądając [historyczny wykres](https://ycharts.com/indicators/ethereum_uncle_rate) wydobytych bloków ommer.

## Demonstracja wizualna {#a-visual-demo}

Zobacz, jak Austin poprowadzi Cię przez wydobycie i blockchain typu „proof-of-work”.

<YouTube id="zcX7OJ-L8XQ" />

## Algorytm wydobywczy {#mining-algorithm}

Sieć główna Ethereum używała zawsze tylko jednego algorytmu wydobywczego – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash był następcą oryginalnego algorytmu R&D znanego jako ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Więcej o algorytmach wydobywczych](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Powiązane tematy {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
