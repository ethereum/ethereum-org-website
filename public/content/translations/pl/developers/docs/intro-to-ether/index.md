---
title: Techniczne wprowadzenie do etheru
description: Wprowadzenie programisty do kryptowaluty ether.
lang: pl
---

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytanie [Wprowadzenia do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest kryptowaluta? {#what-is-a-cryptocurrency}

Kryptowaluta jest środkiem wymiany zabezpieczonym przez rejestr oparty na blockchainie.

Środek wymiany to wszystko, co jest powszechnie akceptowane jako płatność za towary i usługi, a rejestr to magazyn danych, który śledzi transakcje. Technologia blockchain pozwala użytkownikom na dokonywanie transakcji w rejestrze bez polegania na zaufanej stronie trzeciej w celu utrzymania rejestru.

Pierwszą kryptowalutą był Bitcoin, stworzony przez Satoshi Nakamoto. Od czasu premiery Bitcoina w 2009 r. ludzie stworzyli tysiące kryptowalut w wielu różnych blockchainach.

## Czym jest ether? {#what-is-ether}

**Ether (ETH)** to kryptowaluta używana do wielu rzeczy w sieci Ethereum. Zasadniczo jest to jedyna akceptowalna forma płatności za opłaty transakcyjne, a po [The Merge](/roadmap/merge) ether jest wymagany do walidacji i proponowania bloków w sieci głównej. Ether jest również wykorzystywany jako podstawowa forma zabezpieczenia na rynkach pożyczkowych [DeFi](/defi), jako jednostka rozliczeniowa na rynkach NFT, jako płatność za świadczenie usług lub sprzedaż towarów w świecie rzeczywistym i nie tylko.

Ethereum umożliwia programistom tworzenie [**aplikacji zdecentralizowanych (dapki)**](/developers/docs/dapps), które współdzielą pulę mocy obliczeniowej. Ta wspólna pula jest ograniczona, więc Ethereum potrzebuje mechanizmu określającego, kto może z niej korzystać. W przeciwnym razie zdecentralizowana aplikacja mogłaby przypadkowo lub złośliwie wykorzystać wszystkie zasoby sieciowe, co zablokowałoby innym dostęp do nich.

Kryptowaluta ether obsługuje mechanizm wyceny mocy obliczeniowej Ethereum. Kiedy użytkownicy chcą dokonać transakcji, muszą zapłacić ether, aby ich transakcja została rozpoznana w blockchainie. Koszty te znane są jako [opłaty za gaz](/developers/docs/gas/), a wysokość opłaty za gaz zależy od ilości mocy obliczeniowej wymaganej do wykonania transakcji i zapotrzebowania na moc obliczeniową w całej sieci w danym momencie.

W związku z tym, nawet jeśli złośliwa aplikacja przesłała nieskończoną pętlę, transakcja ostatecznie wyczerpałaby ether i zakończyłaby się, umożliwiając sieci powrót do normalnego stanu.

[Powszechnie myli się](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum z etherem — kiedy ludzie mówią o "cenie Ethereum", tak naprawdę opisują cenę etheru.

## Wybijanie etheru {#minting-ether}

Wybijanie to proces, w którym nowy ether jest tworzony w rejestrze Ethereum. Podstawowy protokół Ethereum tworzy nowy ether i nie jest możliwe, aby to użytkownik stworzył ether.

Ether jest wybijany jako nagroda za każdy zaproponowany blok i w każdym punkcie kontrolnym epoki za inne działania walidatora związane z osiągnięciem konsensusu. Całkowita wydana kwota zależy od liczby walidatorów i ilości zestakowanego przez nich etheru. W idealnym przypadku, gdy wszyscy walidatorzy są uczciwi i online, łączna liczba wydawanego etheru jest dzielona równo między walidatorów, ale w rzeczywistości różni się w zależności od ich wydajności. Około 1/8 całkowitej emisji trafia do proponenta bloku; reszta jest rozdzielana między innych walidatorów. Osoby proponujące bloki otrzymują również napiwki z opłat transakcyjnych i dochodów związanych z MEV, ale pochodzą one z recyklingu etheru, a nie z nowej emisji.

## Spalanie etheru {#burning-ether}

Oprócz tworzenia etheru poprzez nagrody blokowe ether może zostać zniszczony w procesie zwanym „spalaniem”. Po spaleniu ether zostaje trwale usunięty z obiegu.

Spalanie etheru występuje w każdej transakcji na Ethereum. Gdy użytkownicy płacą za swoje transakcje, podstawowa opłata za gaz, ustalona przez sieć zgodnie z zapotrzebowaniem na transakcje, zostaje zniszczona. W połączeniu ze zmiennymi rozmiarami bloków i maksymalną opłatą za gaz upraszcza to szacowanie opłat transakcyjnych na Ethereum. Gdy zapotrzebowanie w sieci jest wysokie, [bloki](https://eth.blockscout.com/block/22580057) mogą spalić więcej etheru niż go wybijają, skutecznie kompensując jego emisję.

Spalenie opłaty podstawowej utrudnia producentom bloków manipulowanie transakcjami. Na przykład jeśli producenci bloków otrzymaliby opłatę podstawową, mogliby włączyć własne transakcje za darmo i podnieść opłatę podstawową dla wszystkich innych. Alternatywnie, mogliby oni zwracać podstawową opłatę niektórym użytkownikom offchain, co prowadziłoby do bardziej nieprzejrzystego i złożonego rynku opłat transakcyjnych.

## Denominacje etheru {#denominations}

Ponieważ wartość wielu transakcji na Ethereum jest niewielka, ether ma kilka nominałów, które można określić jako mniejsze jednostki rozliczeniowe. Spośród tych nominałów szczególnie ważne są Wei i gwei.

Wei jest najmniejszą możliwą ilością etheru, w wyniku czego wiele implementacji technicznych, takich jak [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), będzie opierać wszystkie obliczenia na Wei.

Gwei, skrót od giga-wei, jest często używany do opisywania kosztów gazu w Ethereum.

| Nominał | Wartość w etherze | Powszechne użycie                          |
| ------- | ----------------- | ------------------------------------------ |
| Wei     | 10<sup>-18</sup>  | Implementacje techniczne                   |
| Gwei    | 10<sup>-9</sup>   | Opłaty za gaz odczytywalne przez człowieka |

## Przesyłanie etheru {#transferring-ether}

Każda transakcja w Ethereum zawiera pole `value`, które określa ilość etheru do przesłania, wyrażoną w wei, z adresu nadawcy na adres odbiorcy.

Gdy adres odbiorcy jest [inteligentnym kontraktem](/developers/docs/smart-contracts/), ten przesłany ether może zostać wykorzystany do zapłaty za gaz, gdy inteligentny kontrakt wykona swój kod.

[Więcej o transakcjach](/developers/docs/transactions/)

## Sprawdzanie salda etheru {#querying-ether}

Użytkownicy mogą sprawdzić saldo etheru dowolnego [konta](/developers/docs/accounts/), sprawdzając pole `balance` konta, które pokazuje posiadany ether wyrażony w wei.

[Etherscan](https://etherscan.io) i [Blockscout](https://eth.blockscout.com) to popularne narzędzia do sprawdzania sald adresów za pośrednictwem aplikacji internetowych. Na przykład [ta strona Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) pokazuje saldo dla Ethereum Foundation. Salda kont można również sprawdzać za pomocą portfeli lub bezpośrednio, wysyłając żądania do węzłów.

## Dalsza lektura {#further-reading}

- [Definiowanie etheru i Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Biała księga Ethereum](/whitepaper/): Oryginalna propozycja Ethereum. Dokument ten zawiera opis etheru i motywacji stojącej za jego stworzeniem.
- [Kalkulator Gwei](https://www.alchemy.com/gwei-calculator): Użyj tego kalkulatora gwei, aby łatwo przeliczać wei, gwei i ether. Wystarczy wprowadzić dowolną ilość wei, gwei lub ETH, aby automatycznie obliczyć konwersję.

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
