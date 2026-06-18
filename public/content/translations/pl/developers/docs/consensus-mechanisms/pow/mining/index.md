---
title: Kopanie
description: "Wyjaśnienie, jak działało kopanie w Ethereum."
lang: pl
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Dowód pracy (PoW) nie jest już podstawą mechanizmu konsensusu Ethereum, co oznacza, że kopanie zostało wyłączone. Zamiast tego [Ethereum](/) jest zabezpieczane przez walidatorów, którzy stakują ETH. Możesz zacząć stakować swoje ETH już dziś. Przeczytaj więcej o <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>dowodzie stawki (PoS)</a> i <a href='/staking/'>stakingu</a>. Ta strona ma jedynie znaczenie historyczne.
</AlertDescription>
</AlertContent>
</Alert>

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/), [blokami](/developers/docs/blocks/) i [dowodem pracy (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Czym jest kopanie w Ethereum? {#what-is-ethereum-mining}

Kopanie to proces tworzenia bloku transakcji, który ma zostać dodany do blockchaina Ethereum w przestarzałej już architekturze dowodu pracy Ethereum.

Słowo kopanie wywodzi się z analogii kryptowalut do złota. Złoto i metale szlachetne są rzadkie, podobnie jak cyfrowe tokeny, a jedynym sposobem na zwiększenie ich całkowitej ilości w systemie dowodu pracy jest kopanie. W Ethereum opartym na dowodzie pracy jedynym sposobem emisji było kopanie. Jednak w przeciwieństwie do złota czy metali szlachetnych, kopanie w Ethereum było również sposobem na zabezpieczenie sieci poprzez tworzenie, weryfikację, publikowanie i propagowanie bloków w blockchainie.

Kopanie etheru = Zabezpieczanie sieci

Kopanie jest siłą napędową każdego blockchaina opartego na dowodzie pracy. Górnicy Ethereum – komputery z uruchomionym oprogramowaniem – poświęcali swój czas i moc obliczeniową na przetwarzanie transakcji i tworzenie bloków przed przejściem na dowód stawki (PoS).

## Dlaczego istnieją górnicy? {#why-do-miners-exist}

W zdecentralizowanych systemach, takich jak Ethereum, musimy mieć pewność, że wszyscy zgadzają się co do kolejności transakcji. Górnicy pomagali w tym, rozwiązując trudne obliczeniowo zagadki w celu tworzenia bloków, zabezpieczając sieć przed atakami.

[Więcej o dowodzie pracy](/developers/docs/consensus-mechanisms/pow/)

Wcześniej każdy mógł kopać w sieci Ethereum za pomocą swojego komputera. Jednak nie każdy mógł kopać ether (ETH) z zyskiem. W większości przypadków górnicy musieli kupować dedykowany sprzęt komputerowy i mieć dostęp do tanich źródeł energii. Przeciętny komputer raczej nie był w stanie zdobyć wystarczających nagród za bloki, aby pokryć koszty związane z kopaniem.

### Koszt kopania {#cost-of-mining}

- Potencjalne koszty sprzętu niezbędnego do budowy i utrzymania koparki
- Koszt energii elektrycznej do zasilania koparki
- Jeśli kopałeś w puli (pool), pule te zazwyczaj pobierały stałą opłatę procentową od każdego bloku wygenerowanego przez pulę
- Potencjalny koszt sprzętu wspomagającego koparkę (wentylacja, monitorowanie energii, okablowanie elektryczne itp.)

Aby dokładniej zbadać opłacalność kopania, użyj kalkulatora kopania, takiego jak ten udostępniany przez [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jak kopano transakcje w Ethereum {#how-ethereum-transactions-were-mined}

Poniżej przedstawiono przegląd tego, jak transakcje były kopane w dowodzie pracy Ethereum. Analogiczny opis tego procesu dla dowodu stawki Ethereum można znaleźć [tutaj](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Użytkownik tworzy i podpisuje żądanie [transakcji](/developers/docs/transactions/) za pomocą klucza prywatnego pewnego [konta](/developers/docs/accounts/).
2. Użytkownik rozgłasza żądanie transakcji do całej sieci Ethereum z pewnego [węzła](/developers/docs/nodes-and-clients/).
3. Po usłyszeniu o nowym żądaniu transakcji, każdy węzeł w sieci Ethereum dodaje to żądanie do swojego lokalnego mempoola, czyli listy wszystkich żądań transakcji, o których usłyszał, a które nie zostały jeszcze zatwierdzone w blockchainie w żadnym bloku.
4. W pewnym momencie węzeł kopiący agreguje kilkadziesiąt lub kilkaset żądań transakcji w potencjalny [blok](/developers/docs/blocks/) w sposób, który maksymalizuje [opłaty transakcyjne](/developers/docs/gas/), jakie zarabia, jednocześnie mieszcząc się w limicie gazu bloku. Następnie węzeł kopiący:
   1. Weryfikuje ważność każdego żądania transakcji (tj. czy nikt nie próbuje przetransferować etheru z konta, dla którego nie wygenerował podpisu, czy żądanie nie jest zniekształcone itp.), a następnie wykonuje kod żądania, zmieniając stan swojej lokalnej kopii EVM. Górnik przyznaje opłatę transakcyjną za każde takie żądanie transakcji na własne konto.
   2. Rozpoczyna proces tworzenia „certyfikatu legalności” dowodu pracy dla potencjalnego bloku, gdy wszystkie żądania transakcji w bloku zostaną zweryfikowane i wykonane na lokalnej kopii EVM.
5. W końcu górnik kończy tworzenie certyfikatu dla bloku, który zawiera nasze konkretne żądanie transakcji. Następnie górnik rozgłasza ukończony blok, który zawiera certyfikat i sumę kontrolną deklarowanego nowego stanu EVM.
6. Inne węzły dowiadują się o nowym bloku. Weryfikują certyfikat, same wykonują wszystkie transakcje w bloku (w tym transakcję pierwotnie rozgłoszoną przez naszego użytkownika) i sprawdzają, czy suma kontrolna ich nowego stanu EVM po wykonaniu wszystkich transakcji zgadza się z sumą kontrolną stanu deklarowanego przez blok górnika. Dopiero wtedy węzły te dołączają ten blok na końcu swojego blockchaina i akceptują nowy stan EVM jako stan kanoniczny.
7. Każdy węzeł usuwa wszystkie transakcje z nowego bloku ze swojego lokalnego mempoola niezrealizowanych żądań transakcji.
8. Nowe węzły dołączające do sieci pobierają po kolei wszystkie bloki, w tym blok zawierający interesującą nas transakcję. Inicjują lokalną kopię EVM (która zaczyna się jako EVM z pustym stanem), a następnie przechodzą przez proces wykonywania każdej transakcji w każdym bloku na swojej lokalnej kopii EVM, weryfikując po drodze sumy kontrolne stanu przy każdym bloku.

Każda transakcja jest kopana (włączana do nowego bloku i propagowana po raz pierwszy) tylko raz, ale wykonywana i weryfikowana przez każdego uczestnika w procesie posuwania naprzód kanonicznego stanu EVM. Podkreśla to jedną z głównych mantr blockchaina: **Nie ufaj, weryfikuj**.

## Bloki ommer (wujkowskie) {#ommer-blocks}

Kopanie bloków w dowodzie pracy było probabilistyczne, co oznacza, że czasami dwa ważne bloki były publikowane jednocześnie z powodu opóźnień w sieci. W takim przypadku protokół musiał określić najdłuższy (a zatem najbardziej „ważny”) łańcuch, zapewniając jednocześnie uczciwość wobec górników poprzez częściowe nagradzanie zaproponowanego, ale niewłączonego ważnego bloku. Zachęcało to do dalszej decentralizacji sieci, ponieważ mniejsi górnicy, którzy mogli borykać się z większymi opóźnieniami, nadal mogli generować zyski dzięki nagrodom za bloki [ommer](/glossary/#ommer).

Termin „ommer” jest preferowanym, neutralnym płciowo określeniem dla rodzeństwa bloku nadrzędnego, ale czasami określa się go również mianem „wujka” (uncle). **Od czasu przejścia Ethereum na dowód stawki (PoS), bloki ommer nie są już kopane**, ponieważ w każdym slocie wybierany jest tylko jeden proponujący. Możesz zobaczyć tę zmianę, przeglądając [historyczny wykres](https://ycharts.com/indicators/ethereum_uncle_rate) wykopanych bloków ommer.

## Prezentacja wizualna {#a-visual-demo}

Zobacz, jak Austin opowiada o kopaniu i blockchainie opartym na dowodzie pracy.

<VideoWatch slug="blockchain-eth-build" />

## Algorytm kopania {#mining-algorithm}

Sieć główna Ethereum używała tylko jednego algorytmu kopania – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash był następcą oryginalnego algorytmu badawczo-rozwojowego znanego jako ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Więcej o algorytmach kopania](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Powiązane tematy {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/)