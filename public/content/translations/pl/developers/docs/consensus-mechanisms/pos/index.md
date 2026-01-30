---
title: Proof-of-stake (PoS)
description: Wyjaśnienie protokołu konsensusu bazującego na dowodzie stawki (ang. proof-of-stake) i jego roli w Ethereum.
lang: pl
---

Proof-of-stake (PoS) leży u podstaw [mechanizmu konsensusu](/developers/docs/consensus-mechanisms/) Ethereum. W sieci Ethereum włączono mechanizm proof-of-stake w 2022 roku, ponieważ jest on bezpieczniejszy, mniej energochłonny i lepszy do wdrażania nowych rozwiązań skalujących w porównaniu z poprzednią architekturą [proof-of-work](/developers/docs/consensus-mechanisms/pow).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest dowód stawki (PoS)? {#what-is-pos}

proof-of-stake jest sposobem udowodnienia, że walidatorzy włożyli coś cennego do sieci, co może zostać zniszczone, jeśli będą postępować nieuczciwie. W modelu Ethereum proof-of-stake walidatorzy jawnie inwestują kapitał w formie ETH w inteligentnym kontrakcie na Ethereum. Walidator jest odpowiedzialny za sprawdzanie, czy nowe bloki propagowane przez sieć są ważne, a czasami także za tworzenie i propagowanie nowych bloków. Jeśli spróbują oszukać sieć (na przykład proponując kilka bloków, kiedy powinni wysłać jeden lub wysyłając sprzeczne poświadczenia) część z ich zestakowanego ETH może zostać zniszczona.

## Walidatorzy {#validators}

Aby uczestniczyć jako walidator, użytkownik musi zdeponować 32 ETH do kontraktu depozytowego i uruchomić trzy oddzielne części oprogramowania: klienta wykonawczego, klienta konsensusu i klienta walidatora. Po wpłaceniu depozytu w ETH użytkownik dołącza do kolejki aktywacyjnej, która ogranicza tempo dołączania nowych walidatorów do sieci. Po aktywacji walidatorzy otrzymują nowe bloki od węzłow równorzędnych w sieci Ethereum. Transakcje dostarczone do bloku są wykonane ponownie, aby sprawdzić, czy zaproponowane zmiany stanu Ethereum są ważne oraz czy sygnatura bloku jest sprawdzona. Walidator wysyła następnie głos (nazywany poświadczeniem) na korzyść tego bloku w całej sieci.

Podczas gdy w przypadku mechanizmu proof-of-work synchronizacja bloków zależy od trudności wydobycia, w przypadku mechanizmu proof-of-stake tempo jest stałe. Czas w mechanizmie proof-of-stake sieci Ethereum jest podzielony na sloty (12 sekund) i epoki (32 sloty). Jeden walidator jest losowo wybierany na proponenta bloków w każdym slocie. Ten walidator jest odpowiedzialny za utworzenie nowego bloku i wysłanie go do innych węzłów w sieci. Ponadto w każdym slocie wybierana jest losowo komisja walidatorów, której głosy są używane do określenia ważności proponowanego bloku. Podzielenie walidatorów na komitety jest ważne dla utrzymania obciążenia sieci na poziomie możliwym do opanowania. Komitety dzielą walidatorów tak, aby każdy aktywny walidator poświadczał w każdej epoce, ale nie w każdym slocie.

## Jak transakcja jest wykonywana w Ethereum PoS {#transaction-execution-ethereum-pos}

Poniżej znaleźć można kompletne wyjaśnienie tego, w jaki sposób transakcja zostaje wykonana w ramach modelu Ethereum proof-of-stake.

1. Użytkownik tworzy i podpisuje [transakcję](/developers/docs/transactions/) swoim kluczem prywatnym. Zwykle jest to obsługiwane przez portfel lub bibliotekę, taką jak [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) itp., ale pod maską użytkownik wysyła żądanie do węzła za pomocą [JSON-RPC API](/developers/docs/apis/json-rpc/) Ethereum. Użytkownik definiuje ilość gazu, którą jest gotowy zapłacić jako napiwek dla walidatora, aby zachęcić go do włączenia transakcji do bloku. [Napiwki](/developers/docs/gas/#priority-fee) są wypłacane walidatorowi, podczas gdy [opłata podstawowa](/developers/docs/gas/#base-fee) jest spalana.
2. Transakcja jest przesyłana do [klienta wykonawczego](/developers/docs/nodes-and-clients/#execution-client) Ethereum, który weryfikuje jej ważność. To oznacza zapewnienie, że wysyłający posiada wystarczającą ilość ETH, aby wypełnić transakcję, oraz że podpisał ją odpowiednim kluczem.
3. Jeśli transakcja jest ważna, klient wykonawczy dodaje ją do lokalnego mempoolu (listy oczekujących transakcji) oraz nadaje ją do innych węzłów poprzez sieć plotkującą warstwy wykonawczej. Kiedy inne węzły usłyszą o transakcji, również dodają ją do własnego lokalnego mempoolu. Zaawansowani użytkownicy mogą powstrzymać się od rozgłaszania swojej transakcji i zamiast tego przekazać ją do wyspecjalizowanych kreatorów bloków, takich jak [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Pozwala im to organizować transakcje w nadchodzących blokach w celu uzyskania maksymalnego zysku ([MEV](/developers/docs/mev/#mev-extraction)).
4. Jeden z węzłów walidatora w sieci jest proponującym blok dla aktualnego slota, uprzednio zostając wybranym pseudo losowo używając RANDAO. Ten węzeł jest odpowiedzialny za stworzenie i nadanie następnego bloku, aby dodać go do blockchainu Ethereum oraz za aktualizację globalnego stanu. Węzeł składa się z trzech części: klienta wykonawczego, klienta konsensusu oraz klienta walidatora. Klient wykonawczy grupuje transakcje z lokalnego mempoolu w "ładunek wykonawczy" i wykonuje je lokalnie, aby wygenerować zmianę stanu. Ta informacja przekazywana jest do klienta konsensusu, gdzie ładunek wykonawczy jest zawijany jako część "bloku śledzącego", który zawiera również informację o nagrodach, karach, ucięciach, poświadczeniach itd. To umożliwia sieci uzgodnienie kolejności bloków na przedzie łańcucha. Komunikacja między klientem wykonawczym a klientem konsensusu jest opisana bardziej szczegółowo w artykule [Connecting the Consensus and Execution Clients](/developers/docs/networking-layer/#connecting-clients).
5. Inne węzły odbierają blok śledzący na sieci plotkującej wewnątrz warstwy konsensusu. Przekazują go do klienta wykonawczego, gdzie transakcje są wykonywane ponownie lokalnie w celu gwarancji ważności proponowanej zmiany stanu. Klient walidatora następnie poświadcza, że blok jest ważny i jest kolejnym logicznym blokiem w jego widoku łańcucha (co oznacza, że jest on zbudowany na łańcuchu o największej wadze poświadczeń, zgodnie z definicją w [zasadach wyboru forka](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok zostaje dodany do lokalnej bazy danych w każdym węźle, który go poświadcza.
6. Transakcja może zostać uznana "sfinalizowaną" jeśli została częścią łańcucha z połączeniem superwiększościowym pomiędzy dwoma punktami kontrolnymi. Punkty kontrolne występują na początku każdej epoki i istnieją, aby pod uwagę wzięty został fakt, że tylko podzbiór aktywnych walidatorów poświadcza w każdym slocie, podczas gdy wszyscy aktywni walidatorzy poświadczają na przez całą epokę. Połączenie superwiększościowe może zatem zostań zademonstrowane tylko na przełomie dwóch epok (sytuacja ta ma miejsce, kiedy 66% całego zestakowanego na sieci ETH zgadza się w sprawie dwóch punktów kontrolnych).

Więcej szczegółów na temat nieodwołalności można znaleźć poniżej.

## Nieodwołalność {#finality}

Transakcja ma "nieodwołalność" w rozproszonych sieciach, kiedy jest częścią bloku, którego nie można zmienić bez spalenia dużej ilości ETH. W sieci Ethereum z proof-of-stake zarządza się tym za pomocą bloków „punktów kontrolnych”. Pierwszy blok w każdej epoce jest punktem kontrolnym. Walidatorzy głosują na pary punktów kontrolnych, które uznają za ważne. Jeśli para punktów kontrolnych przyciągnie głosy reprezentujące co najmniej dwie trzecie całości stakowanego ETH, punkty kontrolne są uaktualniane. Nowszy z nich dwóch (cel) staje się „uzasadniony”. Wcześniejszy z nich dwóch jest już uzasadniony, ponieważ stanowił „cel” w poprzedniej epoce. Teraz został uaktualniony do stanu „sfinalizowany”. Ten proces aktualizacji punktów kontrolnych jest obsługiwany przez **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG to narzędzie do finalizacji bloków dla konsensusu. Gdy blok zostanie sfinalizowany, nie można go cofnąć ani zmienić bez slashingu większości stakerów, co czyni to ekonomicznie nieopłacalnym.

Aby odwrócić sfinalizowany blok, napastnik musiałby zobowiązać się do utraty co najmniej jednej trzeciej całkowitej podaży stakowanego ETH. Dokładny powód jest wyjaśniony w tym [wpisie na blogu Fundacji Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Jako że nieodwołalność wymaga większości dwóch trzecich, napastnik mógłby powstrzymać sieć przed osiągnięciem nieodwołalności, głosując jedną trzecią stakowanej całości. Istnieje mechanizm obrony przed tym: [wyciek z powodu braku aktywności](https://eth2book.info/bellatrix/part2/incentives/inactivity). Jest on aktywowany za każdym razem, gdy łańcuch nie zdoła sfinalizować więcej niż czterech epok. Wyciek nieaktywności powoduje odpływ stakowanych ETH od walidatorów głosujących przeciwko większości, co pozwala większości odzyskać większość dwóch trzecich i sfinalizować łańcuch.

## Bezpieczeństwo kryptoekonomiczne {#crypto-economic-security}

Prowadzenie walidatora jest zobowiązaniem. Od walidatora oczekuje się, że będzie dysponował wystarczającym sprzętem i łącznością, aby móc uczestniczyć w walidacji i proponowaniu bloków. W zamian walidator otrzymuje zapłatę w ETH (jego stakowane saldo rośnie). Z drugiej strony uczestnictwo w charakterze walidatora otwiera użytkownikom również nowe możliwości atakowania sieci w celu uzyskania osobistego zysku lub sabotażu. Aby temu zapobiec, walidatorzy nie otrzymują nagród w postaci ETH, jeśli nie wezmą udziału na wezwanie, a ich dotychczas stakowane środki mogą zostać zniszczone, jeśli zachowają się nieuczciwie. Dwa podstawowe zachowania mogą być uznane za nieuczciwe: proponowanie wielu bloków w pojedynczym slocie (dwuznaczność) oraz zgłaszanie sprzecznych poświadczeń.

Liczba cięć ETH zależy od tego, ilu walidatorów również zostanie uciętych mniej więcej w tym samym czasie. Jest to znane jako [„kara za korelację”](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) i może być niewielka (~1% stawki dla pojedynczego walidatora poddanego slashingowi) lub może skutkować zniszczeniem 100% stawki walidatora (masowe zdarzenie slashingu). Nakłada się ją w połowie okresu wymuszonego wyjścia, który rozpoczyna się natychmiastową karą (nawet 1 ETH) w dniu 1, karą korelacyjną w dniu 18 i ostatecznie wyrzuceniem z sieci w dniu 36. Codziennie otrzymują drobne kary za poświadczenia, ponieważ są obecni w sieci, ale nie oddają głosów. Wszystko to znaczy, że skoordynowany atak byłby bardzo kosztowny dla napastnika.

## Wybór forka {#fork-choice}

Gdy sieć działa w sposób optymalny i uczciwy, na czele łańcucha znajduje się tylko jeden nowy blok i poświadczają go wszyscy walidatorzy. Może się jednak zdarzyć, że walidatorzy będą mieli różne poglądy na temat czoła łańcucha z powodu latencji sieci lub z powodu niejasnej odpowiedzi proponenta bloku. W związku z tym klienci konsensusu wymagają algorytmu decydującego, którego z nich należy preferować. Algorytm używany w Ethereum z proof-of-stake nazywa się [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) i działa poprzez identyfikację forka, który ma największą wagę poświadczeń w swojej historii.

## Proof-of-stake a bezpieczeństwo {#pos-and-security}

Zagrożenie [atakiem 51%](https://www.investopedia.com/terms/1/51-attack.asp) wciąż istnieje w przypadku proof-of-stake, tak jak w przypadku proof-of-work, ale jest jeszcze bardziej ryzykowne dla atakujących. Napastnik potrzebowałby 51% stakowanego ETH. Następnie mógłby wykorzystać swoje własne poświadczenia w celu zapewnienia, że preferowanym forkiem jest ten z największą liczbą zgromadzonych poświadczeń. „Waga” zgromadzonych poświadczeń jest tym, czego klienci konsensu używają do określenia właściwego łańcucha, więc ten napastnik byłby w stanie sprawić, że kanoniczny będzie jego fork. Przewaga proof-of-stake nad proof-of-work polega jednak na tym, że społeczność ma elastyczność w montażu kontrataku. Na przykład uczciwi walidatorzy mogliby zadecydować o dalszym budowaniu łańcucha mniejszościowego i zignorowaniu forka napastnika, zarazem zachęcając aplikacje, giełdy i pule, aby zrobiły to samo. Mogliby oni również zadecydować o przymusowym usunięciu napastnika z sieci i zniszczeniu jego stakowanego ETH. Są to silne ekonomiczne środki obrony przed atakiem 51%.

Oprócz ataków w stylu 51%, wrogie podmioty mogą również próbować innych złośliwych czynności takich jak:

- ataki o dalekim zasięgu (jednak gadżet nieodwołalności neutralizuje ten front ataku)
- reorganizacje o krótki zasięgu (jednak wzmocnienie proponującego oraz terminy poświadczeń ograniczają ten problem)
- ataki poprzez odbicia i równoważenie (również ograniczone przez wzmocnienie proponującego, jednak te ataki i tak zostały zademonstrowane jedynie w wyidealizowanym stanie sieci)
- ataki lawinowe (zneutralizowane poprzez zasadę algorytmu wyboru rozgałęzienia, która bierze pod uwagę jedynie najnowszą wiadomość)

Ogólnie rzecz biorąc, udowodniono, że mechanizm proof-of-stake w postaci, w jakiej został wdrożony w sieci Ethereum, jest bezpieczniejszy ekonomicznie niż proof-of-work.

## Zalety i wady {#pros-and-cons}

| Zalety                                                                                                                                                                                                                                                                      | Wady                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Stakowanie ułatwia pojedynczym osobom udział w zabezpieczaniu sieci, co sprzyja decentralizacji. węzeł walidatora można prowadzić na zwykłym laptopie. Pule stakingu pozwalają użytkownikom stakować bez posiadania 32 ETH. | Mechanizm proof-of-stake jest nowszy i mniej sprawdzony w boju niż proof-of-work                                                  |
| Zastawianie jest bardziej zdecentralizowane. Ekonomia skali nie ma zastosowania w taki sam sposób, jak w przypadku wydobycia PoW.                                                                                                           | Wdrożenie mechanizmu proof-of-stake jest bardziej skomplikowane niż w przypadku proof-of-work                                     |
| Mechanizm proof-of-stake oferuje większe bezpieczeństwo kryptoekonomiczne niż proof-of-work                                                                                                                                                                                 | Aby uczestniczyć w mechanizmie proof-of-stake Ethereum, użytkownicy muszą uruchomić trzy elementy oprogramowania. |
| Do zachęcenia uczestników sieci potrzeba mniejszej emisji nowego ETH                                                                                                                                                                                                        |                                                                                                                                   |

### Porównanie z proof-of-work {#comparison-to-proof-of-work}

Ethereum pierwotnie używało proof-of-work, lecz zmieniło model na proof-of-stake we wrześniu 2022 roku. PoS oferuje kilka przewag wobec PoW, takich jak:

- lepsza wydajność energetyczna — nie trzeba zużywać dużych ilości energii na obliczenia proof-of-work;
- niższe bariery wejścia, mniejsze wymagania sprzętowe — nie ma potrzeby posiadania elitarnego sprzętu, aby mieć szansę na tworzenie nowych bloków;
- zmniejszenie ryzyka centralizacji — mechanizm proof-of-stake powinien doprowadzić do powstania większej liczby węzłów zabezpieczających sieć;
- ze względu na niskie zapotrzebowanie na energię, trzeba wydać mniej ETH, aby zachęcić do udziału;
- kary ekonomiczne za niewłaściwe zachowanie czynią ataki w stylu 51% bardziej kosztownymi dla atakującego w porównaniu z proof-of-work
- społeczność może uciec się do społecznego odzyskiwania uczciwego łańcucha, jeśli atak 51% pokonałby obronę kryptowalutową.

## Dalsza lektura {#further-reading}

- [Proof of Stake – często zadawane pytania](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Czym jest Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Czym jest Proof of Stake i dlaczego ma to znaczenie](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Dlaczego Proof of Stake (listopad 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: Jak nauczyłem się kochać słabą subiektywność](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Atak i obrona w Ethereum z proof-of-stake](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filozofia projektowania Proof of Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Wideo: Vitalik Buterin wyjaśnia Lexowi Fridmanowi, czym jest proof-of-stake](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Powiązane tematy {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
