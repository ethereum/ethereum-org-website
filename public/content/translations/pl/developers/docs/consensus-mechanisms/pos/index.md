---
title: "Dowód stawki (PoS)"
description: "Wyjaśnienie protokołu konsensusu dowodu stawki (PoS) i jego roli w Ethereum."
lang: pl
---

Dowód stawki (PoS) stanowi podstawę [mechanizmu konsensusu](/developers/docs/consensus-mechanisms/) Ethereum. Ethereum włączyło swój mechanizm dowodu stawki w 2022 roku, ponieważ jest on bezpieczniejszy, mniej energochłonny i lepszy do wdrażania nowych rozwiązań skalujących w porównaniu z poprzednią architekturą [dowodu pracy (PoW)](/developers/docs/consensus-mechanisms/pow).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [mechanizmami konsensusu](/developers/docs/consensus-mechanisms/).

## Czym jest dowód stawki (PoS)? {#what-is-pos}

Dowód stawki to sposób na udowodnienie, że walidatory wniosły do sieci coś wartościowego, co może zostać zniszczone, jeśli będą działać nieuczciwie. W dowodzie stawki [Ethereum](/) walidatory wyraźnie stakują kapitał w postaci ETH w inteligentnym kontrakcie na Ethereum. Walidator jest następnie odpowiedzialny za sprawdzanie, czy nowe bloki propagowane w sieci są prawidłowe, a czasami sam tworzy i propaguje nowe bloki. Jeśli spróbują oszukać sieć (na przykład proponując wiele bloków, gdy powinni wysłać jeden, lub wysyłając sprzeczne poświadczenia), część lub całość ich stakowanego ETH może zostać zniszczona.

## Walidatory {#validators}

Aby uczestniczyć jako walidator, użytkownik musi zdeponować 32 ETH w kontrakcie depozytowym i uruchomić trzy oddzielne elementy oprogramowania: klienta warstwy wykonawczej, klienta konsensusu i klienta walidatora. Po zdeponowaniu swojego ETH użytkownik dołącza do kolejki aktywacji, która ogranicza tempo dołączania nowych walidatorów do sieci. Po aktywacji walidatory otrzymują nowe bloki od węzłów partnerskich w sieci Ethereum. Transakcje dostarczone w bloku są ponownie wykonywane, aby sprawdzić, czy proponowane zmiany stanu Ethereum są prawidłowe, a podpis bloku jest sprawdzany. Następnie walidator wysyła w sieci głos (zwany poświadczeniem) popierający ten blok.

Podczas gdy w dowodzie pracy czas bloków jest określany przez trudność kopania, w dowodzie stawki tempo jest stałe. Czas w Ethereum opartym na dowodzie stawki jest podzielony na sloty (12 sekund) i epoki (32 sloty). W każdym slocie losowo wybierany jest jeden walidator, który staje się proponującym blok. Ten walidator jest odpowiedzialny za utworzenie nowego bloku i wysłanie go do innych węzłów w sieci. Również w każdym slocie losowo wybierany jest komitet walidatorów, których głosy służą do określenia ważności proponowanego bloku. Podział zestawu walidatorów na komitety jest ważny dla utrzymania obciążenia sieci na możliwym do opanowania poziomie. Komitety dzielą zestaw walidatorów tak, aby każdy aktywny walidator poświadczał w każdej epoce, ale nie w każdym slocie.

## Jak transakcja jest wykonywana w Ethereum PoS {#transaction-execution-ethereum-pos}

Poniżej znajduje się kompleksowe wyjaśnienie, w jaki sposób transakcja jest wykonywana w dowodzie stawki Ethereum.

1. Użytkownik tworzy i podpisuje [transakcję](/developers/docs/transactions/) swoim kluczem prywatnym. Zazwyczaj zajmuje się tym portfel lub biblioteka, taka jak [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) itp., ale wewnętrznie użytkownik wysyła żądanie do węzła za pomocą [API JSON-RPC](/developers/docs/apis/json-rpc/) Ethereum. Użytkownik określa ilość gazu, którą jest gotów zapłacić jako opłatę priorytetową dla walidatora, aby zachęcić go do włączenia transakcji do bloku. [Opłaty priorytetowe](/developers/docs/gas/#priority-fee) są wypłacane walidatorowi, podczas gdy [opłata podstawowa](/developers/docs/gas/#base-fee) jest spalana.
2. Transakcja jest przesyłana do [klienta warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-client) Ethereum, który weryfikuje jej ważność. Oznacza to upewnienie się, że nadawca ma wystarczająco dużo ETH, aby zrealizować transakcję, i że podpisał ją właściwym kluczem.
3. Jeśli transakcja jest ważna, klient warstwy wykonawczej dodaje ją do swojego lokalnego mempoola (listy oczekujących transakcji), a także rozgłasza ją do innych węzłów w sieci plotkowania (gossip network) warstwy wykonawczej. Kiedy inne węzły dowiadują się o transakcji, również dodają ją do swojego lokalnego mempoola. Zaawansowani użytkownicy mogą powstrzymać się od rozgłaszania swojej transakcji i zamiast tego przekazać ją do wyspecjalizowanych budowniczych bloków, takich jak [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Pozwala im to na organizowanie transakcji w nadchodzących blokach w celu uzyskania maksymalnego zysku ([MEV](/developers/docs/mev/#mev-extraction)).
4. Jeden z węzłów walidatora w sieci jest proponującym blok dla bieżącego slotu, po uprzednim pseudolosowym wybraniu za pomocą RANDAO. Ten węzeł jest odpowiedzialny za zbudowanie i rozgłoszenie następnego bloku, który ma zostać dodany do blockchaina Ethereum, oraz za aktualizację stanu globalnego. Węzeł składa się z trzech części: klienta warstwy wykonawczej, klienta konsensusu i klienta walidatora. Klient warstwy wykonawczej łączy transakcje z lokalnego mempoola w „ładunek wykonawczy” i wykonuje je lokalnie, aby wygenerować zmianę stanu. Informacja ta jest przekazywana do klienta konsensusu, gdzie ładunek wykonawczy jest opakowywany jako część „bloku śledzącego”, który zawiera również informacje o nagrodach, karach, cięciach, poświadczeniach itp., które umożliwiają sieci uzgodnienie sekwencji bloków na czele łańcucha. Komunikacja między klientami warstwy wykonawczej i konsensusu jest opisana bardziej szczegółowo w sekcji [Łączenie klientów konsensusu i warstwy wykonawczej](/developers/docs/networking-layer/#connecting-clients).
5. Inne węzły otrzymują nowy blok śledzący w sieci plotkowania warstwy konsensusu. Przekazują go do swojego klienta warstwy wykonawczej, gdzie transakcje są ponownie wykonywane lokalnie, aby upewnić się, że proponowana zmiana stanu jest prawidłowa. Następnie klient walidatora poświadcza, że blok jest prawidłowy i jest logicznym następnym blokiem w ich widoku łańcucha (co oznacza, że opiera się na łańcuchu o największej wadze poświadczeń, zgodnie z [regułami wyboru rozwidlenia](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok jest dodawany do lokalnej bazy danych w każdym węźle, który go poświadcza.
6. Transakcję można uznać za „sfinalizowaną”, jeśli stała się częścią łańcucha z „powiązaniem większości kwalifikowanej” między dwoma punktami kontrolnymi. Punkty kontrolne występują na początku każdej epoki i istnieją po to, aby uwzględnić fakt, że tylko podzbiór aktywnych walidatorów poświadcza w każdym slocie, ale wszyscy aktywni walidatorzy poświadczają w całej epoce. Dlatego tylko między epokami można wykazać „powiązanie większości kwalifikowanej” (ma to miejsce, gdy 66% całkowitego stakowanego ETH w sieci zgadza się co do dwóch punktów kontrolnych).

Więcej szczegółów na temat ostateczności można znaleźć poniżej.

## Ostateczność {#finality}

Transakcja ma „ostateczność” w sieciach rozproszonych, gdy jest częścią bloku, który nie może ulec zmianie bez spalenia dużej ilości ETH. W Ethereum opartym na dowodzie stawki zarządza się tym za pomocą bloków „punktów kontrolnych”. Pierwszy blok w każdej epoce to punkt kontrolny. Walidatory głosują na pary punktów kontrolnych, które uznają za ważne. Jeśli para punktów kontrolnych przyciągnie głosy reprezentujące co najmniej dwie trzecie całkowitego stakowanego ETH, punkty kontrolne zostają zaktualizowane. Nowszy z nich (cel) staje się „uzasadniony”. Wcześniejszy z nich jest już uzasadniony, ponieważ był „celem” w poprzedniej epoce. Teraz zostaje zaktualizowany do „sfinalizowanego”. Ten proces aktualizacji punktów kontrolnych jest obsługiwany przez **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG to narzędzie ostateczności bloków dla konsensusu. Gdy blok zostanie sfinalizowany, nie można go wycofać ani zmienić bez cięcia większości stakujących, co czyni to ekonomicznie nieopłacalnym.

Aby wycofać sfinalizowany blok, atakujący musiałby podjąć zobowiązanie utraty co najmniej jednej trzeciej całkowitej podaży stakowanego ETH. Dokładny powód tego jest wyjaśniony w tym [poście na blogu Fundacji Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Ponieważ ostateczność wymaga większości dwóch trzecich, atakujący mógłby uniemożliwić sieci osiągnięcie ostateczności, głosując jedną trzecią całkowitej stawki. Istnieje mechanizm obrony przed tym: [wyciek za nieaktywność](https://eth2book.info/bellatrix/part2/incentives/inactivity). Aktywuje się on za każdym razem, gdy łańcuch nie zostanie sfinalizowany przez więcej niż cztery epoki. Wyciek za nieaktywność powoduje utratę stakowanego ETH przez walidatory głosujące przeciwko większości, pozwalając większości odzyskać większość dwóch trzecich i sfinalizować łańcuch.

## Bezpieczeństwo kryptoekonomiczne {#crypto-economic-security}

Prowadzenie walidatora to zobowiązanie. Oczekuje się, że walidator utrzyma wystarczający sprzęt i łączność, aby uczestniczyć w walidacji bloku i propozycji. W zamian walidator otrzymuje wynagrodzenie w ETH (jego stakowane saldo rośnie). Z drugiej strony, uczestnictwo jako walidator otwiera również nowe drogi dla użytkowników do atakowania sieci w celu uzyskania osobistych korzyści lub sabotażu. Aby temu zapobiec, walidatory tracą nagrody w ETH, jeśli nie wezmą udziału, gdy zostaną do tego wezwane, a ich istniejąca stawka może zostać zniszczona, jeśli zachowają się nieuczciwie. Dwa główne zachowania można uznać za nieuczciwe: proponowanie wielu bloków w jednym slocie (dwuznaczność) i przesyłanie sprzecznych poświadczeń.

Ilość ciętego ETH zależy od tego, ile walidatorów jest również ciętych w tym samym czasie. Jest to znane jako [„kara za korelację”](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) i może być niewielka (\~1% stawki dla pojedynczego walidatora ciętego samodzielnie) lub może skutkować zniszczeniem 100% stawki walidatora (masowe zdarzenie cięcia). Jest ona nakładana w połowie okresu przymusowego wyjścia, który rozpoczyna się natychmiastową karą (do 1 ETH) w 1. dniu, karą za korelację w 18. dniu i wreszcie wyrzuceniem z sieci w 36. dniu. Otrzymują oni drobne kary za poświadczenia każdego dnia, ponieważ są obecni w sieci, ale nie przesyłają głosów. Wszystko to oznacza, że skoordynowany atak byłby bardzo kosztowny dla atakującego.

## Wybór rozwidlenia {#fork-choice}

Gdy sieć działa optymalnie i uczciwie, na czele łańcucha znajduje się tylko jeden nowy blok, a wszystkie walidatory go poświadczają. Jednakże możliwe jest, że walidatory mają różne widoki czoła łańcucha z powodu opóźnień w sieci lub dlatego, że proponujący blok zachował się dwuznacznie. Dlatego klienty konsensusu wymagają algorytmu, aby zdecydować, który z nich faworyzować. Algorytm używany w dowodzie stawki Ethereum nazywa się [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) i działa poprzez identyfikację rozwidlenia, które ma największą wagę poświadczeń w swojej historii.

## Dowód stawki a bezpieczeństwo {#pos-and-security}

Zagrożenie [atakiem 51%](https://www.investopedia.com/terms/1/51-attack.asp) nadal istnieje w dowodzie stawki, podobnie jak w dowodzie pracy, ale jest jeszcze bardziej ryzykowne dla atakujących. Atakujący potrzebowałby 51% stakowanego ETH. Mógłby wtedy użyć własnych poświadczeń, aby upewnić się, że preferowane przez niego rozwidlenie jest tym, które zgromadziło najwięcej poświadczeń. „Waga” zgromadzonych poświadczeń jest tym, czego klienty konsensusu używają do określenia właściwego łańcucha, więc ten atakujący byłby w stanie uczynić swoje rozwidlenie kanonicznym. Jednakże siłą dowodu stawki w porównaniu z dowodem pracy jest to, że społeczność ma elastyczność w przeprowadzaniu kontrataku. Na przykład uczciwe walidatory mogłyby zdecydować się na dalsze budowanie na łańcuchu mniejszościowym i zignorowanie rozwidlenia atakującego, jednocześnie zachęcając aplikacje, giełdy i pule do zrobienia tego samego. Mogłyby również zdecydować się na siłowe usunięcie atakującego z sieci i zniszczenie jego stakowanego ETH. Są to silne zabezpieczenia ekonomiczne przed atakiem 51%.

Poza atakami 51%, źli aktorzy mogą również próbować innych rodzajów złośliwych działań, takich jak:

- ataki dalekiego zasięgu (chociaż narzędzie ostateczności neutralizuje ten wektor ataku)
- „reorganizacje” krótkiego zasięgu (chociaż wzmocnienie proponującego i terminy poświadczeń łagodzą to)
- ataki typu bouncing i balancing (również łagodzone przez wzmocnienie proponującego, a ataki te i tak zostały zademonstrowane tylko w wyidealizowanych warunkach sieciowych)
- ataki lawinowe (neutralizowane przez regułę algorytmów wyboru rozwidlenia polegającą na uwzględnianiu tylko najnowszej wiadomości)

Ogólnie rzecz biorąc, wykazano, że dowód stawki, w postaci wdrożonej w Ethereum, jest bardziej bezpieczny ekonomicznie niż dowód pracy.

## Plusy i minusy {#pros-and-cons}

| Plusy                                                                                                                                                                                                               | Minusy                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Staking ułatwia jednostkom uczestnictwo w zabezpieczaniu sieci, promując decentralizację. Węzeł walidatora można uruchomić na zwykłym laptopie. Pule stakingowe pozwalają użytkownikom na stakowanie bez posiadania 32 ETH. | Dowód stawki jest młodszy i mniej sprawdzony w boju w porównaniu z dowodem pracy              |
| Staking jest bardziej zdecentralizowany. Ekonomia skali nie ma tu zastosowania w taki sam sposób, jak w przypadku kopania PoW.                                                                                                         | Dowód stawki jest bardziej złożony we wdrożeniu niż dowód pracy                          |
| Dowód stawki oferuje większe bezpieczeństwo kryptoekonomiczne niż dowód pracy                                                                                                                                           | Użytkownicy muszą uruchomić trzy elementy oprogramowania, aby uczestniczyć w dowodzie stawki Ethereum. |
| Wymagana jest mniejsza emisja nowego ETH, aby zachęcić uczestników sieci                                                                                                                                            |                                                                                         |

### Porównanie z dowodem pracy {#comparison-to-proof-of-work}

Ethereum pierwotnie używało dowodu pracy, ale we wrześniu 2022 r. przeszło na dowód stawki. PoS oferuje kilka zalet w stosunku do PoW, takich jak:

- lepsza efektywność energetyczna – nie ma potrzeby zużywania dużej ilości energii na obliczenia dowodu pracy
- niższe bariery wejścia, zmniejszone wymagania sprzętowe – nie ma potrzeby posiadania elitarnego sprzętu, aby mieć szansę na tworzenie nowych bloków
- zmniejszone ryzyko centralizacji – dowód stawki powinien prowadzić do większej liczby węzłów zabezpieczających sieć
- ze względu na niskie zapotrzebowanie na energię wymagana jest mniejsza emisja ETH, aby zachęcić do uczestnictwa
- kary ekonomiczne za niewłaściwe zachowanie sprawiają, że ataki w stylu 51% są bardziej kosztowne dla atakującego w porównaniu z dowodem pracy
- społeczność może uciec się do odzyskiwania społecznościowego uczciwego łańcucha, gdyby atak 51% miał pokonać zabezpieczenia kryptoekonomiczne.

## Dalsza lektura {#further-reading}

- [FAQ dotyczące dowodu stawki](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) – _Vitalik Buterin_
- [Czym jest dowód stawki](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) – _ConsenSys_
- [Czym jest dowód stawki i dlaczego ma znaczenie](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) – _Vitalik Buterin_
- [Dlaczego dowód stawki (listopad 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) – _Vitalik Buterin_
- [Dowód stawki: Jak nauczyłem się kochać słabą subiektywność](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) – _Vitalik Buterin_
- [Atak i obrona w Ethereum opartym na dowodzie stawki](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filozofia projektowania dowodu stawki](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) – _Vitalik Buterin_
- [Wideo: Vitalik Buterin wyjaśnia dowód stawki Lexowi Fridmanowi](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Powiązane tematy {#related-topics}

- [Dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Dowód autorytetu (PoA)](/developers/docs/consensus-mechanisms/poa/)