---
title: Techniczne wprowadzenie do etheru
description: Wprowadzenie do kryptowaluty ether dla deweloperów.
lang: pl
---

## Wymagania wstępne {#prerequisites}

Aby pomóc Ci lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać [Wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest kryptowaluta? {#what-is-a-cryptocurrency}

Kryptowaluta to środek wymiany zabezpieczony przez księgę główną opartą na technologii blockchain.

Środek wymiany to wszystko, co jest powszechnie akceptowane jako zapłata za towary i usługi, a księga główna to magazyn danych, który śledzi transakcje. Technologia blockchain pozwala użytkownikom na dokonywanie transakcji w księdze głównej bez polegania na zaufanej stronie trzeciej w celu jej utrzymania.

Pierwszą kryptowalutą był Bitcoin, stworzony przez Satoshiego Nakamoto. Od czasu wydania Bitcoina w 2009 roku, ludzie stworzyli tysiące kryptowalut na wielu różnych blockchainach.

## Czym jest ether? {#what-is-ether}

**Ether (ETH)** to kryptowaluta używana do wielu rzeczy w sieci Ethereum. Zasadniczo jest to jedyna akceptowalna forma płatności za opłaty transakcyjne, a po [The Merge](/roadmap/merge), ether jest wymagany do walidacji i proponowania bloków w Sieci głównej. Ether jest również używany jako podstawowa forma zabezpieczenia na rynkach pożyczkowych [zdecentralizowanych finansów (DeFi)](/defi), jako jednostka rozliczeniowa na rynkach NFT, jako zapłata za świadczenie usług lub sprzedaż rzeczywistych towarów i nie tylko.

Ethereum pozwala deweloperom tworzyć [**zdecentralizowane aplikacje (dapp)**](/developers/docs/dapps), które współdzielą pulę mocy obliczeniowej. Ta współdzielona pula jest skończona, więc Ethereum potrzebuje mechanizmu, aby określić, kto może z niej korzystać. W przeciwnym razie dapp mógłby przypadkowo lub złośliwie zużyć wszystkie zasoby sieci, co zablokowałoby innym dostęp do niej.

Kryptowaluta ether wspiera mechanizm wyceny mocy obliczeniowej Ethereum. Kiedy użytkownicy chcą dokonać transakcji, muszą zapłacić etherem, aby ich transakcja została uznana na blockchainie. Te koszty użytkowania są znane jako [opłaty za gaz](/developers/docs/gas/), a opłata za gaz zależy od ilości mocy obliczeniowej wymaganej do wykonania transakcji oraz ogólnosieciowego popytu na moc obliczeniową w danym momencie.

Dlatego też, nawet jeśli złośliwy dapp przesłałby nieskończoną pętlę, transakcji w końcu zabrakłoby etheru i zostałaby przerwana, pozwalając sieci na powrót do normy.

Często [mylnie utożsamia się](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum i ether — kiedy ludzie mówią o „cenie Ethereum”, mają na myśli cenę etheru.

## Wybijanie etheru {#minting-ether}

Wybijanie to proces, w którym nowy ether jest tworzony w księdze głównej Ethereum. Podstawowy protokół Ethereum tworzy nowy ether i nie jest możliwe, aby użytkownik sam go stworzył.

Ether jest wybijany jako nagroda za każdy zaproponowany blok oraz w każdym punkcie kontrolnym epoki za inne działania walidatorów związane z osiąganiem konsensusu. Całkowita wyemitowana kwota zależy od liczby walidatorów i tego, ile etheru stakowali. Ta całkowita emisja jest dzielona równo między walidatorów w idealnym przypadku, gdy wszyscy walidatorzy są uczciwi i online, ale w rzeczywistości różni się w zależności od wydajności walidatora. Około 1/8 całkowitej emisji trafia do proponującego blok; reszta jest rozdzielana między pozostałych walidatorów. Proponujący blok otrzymują również napiwki z opłat transakcyjnych i dochodów związanych z MEV, ale pochodzą one z etheru będącego już w obiegu, a nie z nowej emisji.

## Spalanie etheru {#burning-ether}

Oprócz tworzenia etheru poprzez nagrody za bloki, ether może zostać zniszczony w procesie zwanym „spalaniem”. Kiedy ether zostaje spalony, jest trwale usuwany z obiegu.

Spalanie etheru ma miejsce w każdej transakcji na Ethereum. Kiedy użytkownicy płacą za swoje transakcje, opłata podstawowa za gaz, ustalana przez sieć zgodnie z popytem transakcyjnym, ulega zniszczeniu. To, w połączeniu ze zmiennymi rozmiarami bloków i maksymalną opłatą za gaz, upraszcza szacowanie opłat transakcyjnych na Ethereum. Kiedy popyt w sieci jest wysoki, [bloki](https://eth.blockscout.com/block/22580057) mogą spalić więcej etheru niż wybijają, skutecznie równoważąc emisję etheru.

Spalanie opłaty podstawowej utrudnia producentom bloków manipulowanie transakcjami. Na przykład, gdyby producenci bloków otrzymywali opłatę podstawową, mogliby dołączać własne transakcje za darmo i podnosić opłatę podstawową dla wszystkich innych. Alternatywnie, mogliby zwracać opłatę podstawową niektórym użytkownikom w sposób pozałańcuchowy, co prowadziłoby do bardziej nieprzejrzystego i złożonego rynku opłat transakcyjnych.

## Nominały etheru {#denominations}

Ponieważ wartość wielu transakcji na Ethereum jest niewielka, ether ma kilka nominałów, które mogą być określane jako mniejsze jednostki rozliczeniowe. Spośród tych nominałów, wei i gwei są szczególnie ważne.

Wei to najmniejsza możliwa ilość etheru, w wyniku czego wiele implementacji technicznych, takich jak [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), opiera wszystkie obliczenia na wei.

Gwei, skrót od giga-wei, jest często używany do opisywania kosztów gazu na Ethereum.

| Nominał      | Wartość w etherze | Powszechne użycie         |
| ------------ | ----------------- | ------------------------- |
| Wei          | 10<sup>-18</sup>  | Implementacje techniczne  |
| Gwei         | 10<sup>-9</sup>   | Czytelne opłaty za gaz    |

## Przesyłanie etheru {#transferring-ether}

Każda transakcja na Ethereum zawiera pole `value`, które określa ilość etheru do przesłania, wyrażoną w wei, do wysłania z adresu nadawcy na adres odbiorcy.

Kiedy adresem odbiorcy jest [inteligentny kontrakt](/developers/docs/smart-contracts/), ten przesłany ether może zostać użyty do zapłaty za gaz, gdy inteligentny kontrakt wykonuje swój kod.

[Więcej o transakcjach](/developers/docs/transactions/)

## Sprawdzanie etheru {#querying-ether}

Użytkownicy mogą sprawdzić saldo etheru dowolnego [konta](/developers/docs/accounts/), badając pole `balance` konta, które pokazuje posiadany ether wyrażony w wei.

[Etherscan](https://etherscan.io) i [Blockscout](https://eth.blockscout.com) to popularne narzędzia do sprawdzania sald adresów za pośrednictwem aplikacji internetowych. Na przykład [ta strona Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) pokazuje saldo dla Fundacji Ethereum. Salda kont można również sprawdzać za pomocą portfeli lub bezpośrednio, wysyłając żądania do węzłów.

## Dalsza lektura {#further-reading}

- [Definiowanie etheru i Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Biała księga Ethereum](/whitepaper/): Oryginalna propozycja dla Ethereum. Ten dokument zawiera opis etheru i motywacje stojące za jego stworzeniem.
- [Kalkulator Gwei](https://www.alchemy.com/gwei-calculator): Użyj tego kalkulatora gwei, aby łatwo przeliczać wei, gwei i ether. Po prostu wpisz dowolną ilość wei, gwei lub ETH i automatycznie oblicz konwersję.

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_