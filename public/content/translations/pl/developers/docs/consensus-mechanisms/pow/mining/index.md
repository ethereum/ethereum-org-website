---
title: Wydobywanie
description: Wyjaśnienie jak działa wydobycie w Ethereum i jak pomaga utrzymać Ethereum bezpieczne i zdecentralizowane.
lang: pl
incomplete: true
---

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznanie się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) i [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

## Czym jest wydobycie w Ethereum? {#what-is-ethereum-mining}

Wydobycie to proces tworzenia bloku złożonego z transakcji, aby dodać go do blockchaina Ethereum.

Ethereum, tak jak Bitcoin, obecnie korzysta z mechanizmu konsensusu [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/). Górnictwo jest siłą napędową proof-of-work. Górnicy Ethereum - komputery obsługujące oprogramowanie - wykorzystują czas i moc obliczeniową do przetwarzania transakcji i produkcji bloków.

## Dlaczego górnicy istnieją? {#why-do-miners-exist}

W zdecentralizowanych systemach, takich jak Ethereum, musimy dopilnować, aby wszyscy zgodzili się na kolejność transakcji. Górnicy pomagają w tym poprzez rozwiązywanie trudnych obliczeniowo łamigłówek w celu produkcji bloków, które służą jako sposób zabezpieczenia sieci przed atakami.

[Więcej o proof of work](/developers/docs/consensus-mechanisms/pow/)

## Jak są wydobywane transakcje Ethereum {#how-ethereum-transactions-are-mined}

1. Użytkownik pisze i podpisuje żądanie [transakcji](/developers/docs/transactions/) kluczem prywatnym niektórych [ kont](/developers/docs/accounts/).
2. Użytkownik wysyła żądanie transakcji do całej sieci Ethereum z jakiegoś [węzła](/developers/docs/nodes-and-clients/).
3. Po usłyszeniu o nowym żądaniu transakcji, każdy węzeł w sieci Ethereum dodaje żądanie do swojej lokalnej pamięci, listy wszystkich żądań transakcji, o których słyszał, a które nie zostały jeszcze zatwierdzone do blockchaina w bloku.
4. W pewnym momencie węzeł górniczy agreguje kilkadziesiąt lub kilkaset żądań transakcji w potencjalny [blok](/developers/docs/blocks/), w sposób maksymalizujący zarabiane [opłaty transakcyjne](/developers/docs/gas/), ale nie przekraczając limitu gazu blokowego. Następnie węzeł wydobywczy:
   1. Weryfikuje ważność każdego żądania transakcji (tj. nikt nie próbuje przenieść eteru z konta, dla którego nie złożył podpisu, żądanie nie jest zniekształcone itp.), a następnie wykonuje kod żądania, zmieniając stan ich lokalnej kopii EVM. Górnik otrzymuje opłatę transakcyjną za każde takie żądanie transakcji na własny rachunek.
   2. Rozpoczyna proces tworzenia „certyfikatu legalności” proof-of-work dla potencjalnego bloku, gdy wszystkie żądania transakcji w bloku zostaną zweryfikowane i wykonane na lokalnej kopii EVM.
5. W końcu górnik zakończy produkcję certyfikatu dla bloku, który zawiera nasze konkretne żądanie transakcji. Górnik następnie emituje wypełniony blok, który zawiera certyfikat i sumę kontrolną żądanego nowego stanu EVM.
6. Inne węzły słyszą o nowym bloku. Weryfikują certyfikat, samodzielnie wykonują wszystkie transakcje na bloku (w tym transakcję oryginalnie wyemitowaną przez naszego użytkownika) i sprawdzają, czy suma kontrolna ich nowego stanu EVM po wykonaniu wszystkich transakcji jest zgodna z sumą kontrolną stanu zgłaszanego przez blok górnika. Dopiero wtedy węzły dołączają ten blok do ogona swojego blokchaina i akceptują nowy stan EVM jako stan kanoniczny.
7. Każdy węzeł usuwa wszystkie transakcje w nowym bloku z lokalnej pamięci niespełnionych żądań transakcji.
8. Nowe węzły dołączające do sieci pobierają kolejno wszystkie bloki, w tym blok zawierający naszą interesującą transakcję. Inicjują lokalną kopię EVM (która zaczyna się jako EVM w stanie pustym), a następnie przechodzą przez proces wykonywania każdej transakcji w każdym bloku na wierzchu ich lokalnej kopii EVM, weryfikując po drodze sumy kontrolne stanu w każdym bloku.

Każda transakcja jest wydobywana (zawarta w nowym bloku i po raz pierwszy propagowana) jednorazowo, ale wykonywana i weryfikowana przez każdego uczestnika procesu przechodzenia do stanu kanonicznego EVM. Podkreśla to jedną z głównych mantr blockchain: **Nie ufaj, weryfikuj**.

## Demo wizualne {#a-visual-demo}

Zobacz, jak Austin poprowadzi Cię przez wydobycie i blockchain typu „proof-of-work”.

<YouTube id="zcX7OJ-L8XQ" />

## Dalsza lektura {#further-reading}

## Powiązane narzędzia {#related-tools}

- [Najlepsi górnicy Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Kalkulator wydobycia Ethereum](https://minerstat.com/coin/ETH)

## Tematy powiązane {#related-topics}

- [Paliwo](/developers/docs/gas/)
- [Maszyna Wirtualna Ethereum (EVM)](/developers/docs/evm/)
- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
