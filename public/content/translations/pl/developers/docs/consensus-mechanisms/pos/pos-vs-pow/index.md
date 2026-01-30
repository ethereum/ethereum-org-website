---
title: "Dowód stawki(proof-of-stake) vs dowód pracy(proof-of-work)"
description: "Porównanie mechanizmów konsensusu Ethereum, opartych na proof-of-stake i proof-of-work"
lang: pl
---

Kiedy Ethereum zostało uruchomione, mechanizm proof-of-stake wciąż wymagał wielu badań i prac nad rozwojem, zanim stwierdzono, że odpowiednio zabezpieczy blockchain Ethereum. Mechanizm proof-of-work był o wiele prostszy, i jego działanie sprawdzone, przez blockchain bitcoina, co pozwalało developerom Ethereum na jego łatwą i szybką implementację, by uruchomić Ethereum. Rozwinięcie mechanizmu proof-of-stake, do punktu, gdzie może zostać wykorzystany, zajęło osiem lat.

Ta strona wyjaśnia powody dla których, Ethereum przeszło z mechanizmu proof-of-work na proof-of-stake, i przedstawia kompromisy z tym związane.

## Bezpieczeństwo {#security}

Badacze Ethereum twierdzą, że mechanizm proof-of-stake jest bardziej bezpieczny od mechanizmu proof-of-work. Jednak mechanizm ten, dopiero niedawno po raz pierwszy, został zaimplementowany do prawdziwej, głównej sieci Ethereum, więc jego działanie jest mniej sprawdzone. W poniższych sekcjach omówiono zalety i wady modelu bezpieczeństwa w mechanizmie proof-of-stake, w porównaniu do mechanizmu proof-of-work.

### Koszt ataku {#cost-to-attack}

W systemie dowodu stawki walidatorzy są zobowiązani do zdeponowania („stakowania”) co najmniej 32 ETH w inteligentnym kontrakcie. Ethereum może zniszczyć zastakowany ether, aby ukarać walidatorów, którzy działają nieprawidłowo. Aby osiągnąć konsensus, co najmniej 66% całkowitej ilości zastakowanego etheru musi zagłosować za określonym zestawem bloków. Bloki, na które zagłosowało >=66% stawki, stają się „sfinalizowane”, co oznacza, że nie można ich usunąć ani zreorganizować.

Atak na sieć może oznaczać uniemożliwienie sfinalizowania łańcucha lub zapewnienie określonej organizacji bloków w łańcuchu kanonicznym, co w jakiś sposób przynosi korzyść atakującemu. Wymaga to od atakującego odwrócenia ścieżki uczciwego konsensusu, albo poprzez zgromadzenie dużej ilości etheru i bezpośrednie głosowanie nim, albo poprzez nakłonienie uczciwych walidatorów do głosowania w określony sposób. Pomijając wyrafinowane ataki o niskim prawdopodobieństwie, które nakłaniają uczciwych walidatorów do określonego działania, koszt ataku na Ethereum to koszt stawki, którą atakujący musi zgromadzić, aby wpłynąć na konsensus na swoją korzyść.

Najniższy koszt ataku to >33% całkowitej stawki. Atakujący posiadający >33% całkowitej stawki może spowodować opóźnienie finalizacji, po prostu przechodząc w tryb offline. Jest to stosunkowo niewielki problem dla sieci, ponieważ istnieje mechanizm znany jako „wyciek bezczynności”, który powoduje wyciek stawki od walidatorów offline, dopóki większość online nie będzie reprezentować 66% stawki i nie będzie mogła ponownie sfinalizować łańcucha. Teoretycznie możliwe jest również, że atakujący spowoduje podwójną finalizację z nieco ponad 33% całkowitej stawki, tworząc dwa bloki zamiast jednego, gdy zostanie poproszony o bycie producentem bloku, a następnie podwójnie zagłosuje wszystkimi swoimi walidatorami. Każdy fork wymaga jedynie, aby 50% pozostałych uczciwych walidatorów zobaczyło każdy blok jako pierwsze, więc jeśli uda im się odpowiednio zgrać w czasie swoje komunikaty, mogą być w stanie sfinalizować oba forki. Ma to niskie prawdopodobieństwo powodzenia, ale gdyby atakującemu udało się spowodować podwójną finalizację, społeczność Ethereum musiałaby zdecydować, za którym forkiem podążać, w którym to przypadku walidatorzy atakującego zostaliby ukarani cięciem na drugim forku.

Mając >33% całkowitej stawki, atakujący ma szansę wywrzeć niewielki (opóźnienie finalizacji) lub poważniejszy (podwójna finalizacja) wpływ na sieć Ethereum. Przy ponad 14 000 000 ETH zastakowanych w sieci i reprezentatywnej cenie 1000 USD/ETH, minimalny koszt przeprowadzenia tych ataków wynosi `1000 x 14 000 000 x 0,33 = 4 620 000 000 USD`. Atakujący straciłby te pieniądze poprzez cięcie i zostałby wyrzucony z sieci. Aby ponownie zaatakować, musiałby zgromadzić >33% stawki (ponownie) i spalić ją (ponownie). Każda próba ataku na sieć kosztowałaby ponad 4,6 miliarda dolarów (przy cenie 1000 USD/ETH i 14 milionach zastakowanych ETH). Atakujący jest również wyrzucany z sieci, gdy zostanie ukarany cięciem, i musi dołączyć do kolejki aktywacyjnej, aby ponownie dołączyć. Oznacza to, że szybkość ponownego ataku jest ograniczona nie tylko szybkością, z jaką atakujący może zgromadzić >33% całkowitej stawki, ale także czasem potrzebnym na wprowadzenie wszystkich swoich walidatorów do sieci. Za każdym razem, gdy atakujący atakuje, staje się on znacznie biedniejszy, a reszta społeczności staje się bogatsza dzięki wynikającemu z tego szokowi podażowemu.

Inne ataki, takie jak ataki 51% lub odwrócenie finalizacji z 66% całkowitej stawki, wymagają znacznie więcej ETH i są o wiele bardziej kosztowne dla atakującego.

Porównaj to z dowodem pracy. Koszt przeprowadzenia ataku na Ethereum z dowodem pracy był kosztem konsekwentnego posiadania >50% całkowitego hashrate'u sieci. Sprowadzało się to do kosztów sprzętu i jego eksploatacji, o wystarczającej mocy obliczeniowej, aby konsekwentnie prześcigać innych górników w obliczaniu rozwiązań dowodu pracy. Ethereum było w większości wydobywane przy użyciu kart GPU, a nie układów ASIC, co utrzymywało niskie koszty (chociaż gdyby Ethereum pozostało przy dowodzie pracy, kopanie za pomocą układów ASIC mogłoby stać się bardziej popularne). Przeciwnik musiałby zakupić dużo sprzętu i zapłacić za energię elektryczną, aby zaatakować sieć Ethereum z dowodem pracy, ale całkowity koszt byłby niższy niż koszt wymagany do zgromadzenia wystarczającej ilości ETH do przeprowadzenia ataku. Atak 51% jest ~[20 razy tańszy](https://youtu.be/1m12zgJ42dI?t=1562) w przypadku dowodu pracy niż w przypadku dowodu stawki. Gdyby atak został wykryty, a łańcuch poddany hard forkowi w celu usunięcia zmian, atakujący mógłby wielokrotnie używać tego samego sprzętu do atakowania nowego forka.

### Złożoność {#complexity}

Dowód stawki jest znacznie bardziej złożony niż dowód pracy. Może to być argument na korzyść dowodu pracy, ponieważ trudniej jest przypadkowo wprowadzić błędy lub niezamierzone efekty do prostszych protokołów. Jednak złożoność została okiełznana dzięki latom badań i rozwoju, symulacji i wdrożeń w sieciach testowych. Protokół dowodu stawki został niezależnie wdrożony przez pięć oddzielnych zespołów (na każdej z warstw wykonawczej i konsensusu) w pięciu językach programowania, zapewniając odporność na błędy klientów.

Aby bezpiecznie rozwijać i testować logikę konsensusu dowodu stawki, Beacon Chain został uruchomiony dwa lata przed wdrożeniem dowodu stawki w sieci głównej Ethereum. Beacon Chain działał jako piaskownica do testowania dowodu stawki, ponieważ był to działający blockchain implementujący logikę konsensusu dowodu stawki, ale bez dotykania prawdziwych transakcji Ethereum – w efekcie po prostu osiągając konsensus sam na sobie. Gdy był on stabilny i wolny od błędów przez wystarczająco długi czas, Beacon Chain został „połączony” z siecią główną Ethereum. Wszystko to przyczyniło się do okiełznania złożoności dowodu stawki do tego stopnia, że ryzyko niezamierzonych konsekwencji lub błędów klienta było bardzo niskie.

### Powierzchnia ataku {#attack-surface}

Dowód stawki jest bardziej złożony niż dowód pracy, co oznacza, że istnieje więcej potencjalnych wektorów ataku, z którymi trzeba sobie poradzić. Zamiast jednej sieci peer-to-peer łączącej klientów, istnieją dwie, z których każda implementuje oddzielny protokół. Wstępne wybranie jednego konkretnego walidatora do zaproponowania bloku w każdym slocie stwarza potencjał do ataku typu „odmowa usługi”, w którym duże ilości ruchu sieciowego przełączają tego konkretnego walidatora w tryb offline.

Istnieją również sposoby, w jakie atakujący mogą starannie zaplanować w czasie publikację swoich bloków lub poświadczeń, tak aby zostały one odebrane przez pewną część uczciwej sieci, wpływając na nich, aby głosowali w określony sposób. Wreszcie, atakujący może po prostu zgromadzić wystarczającą ilość ETH, aby stakować i zdominować mechanizm konsensusu. Każdy z tych [wektorów ataku ma powiązane mechanizmy obronne](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ale nie trzeba się przed nimi bronić w przypadku dowodu pracy.

## Decentralizacja {#decentralization}

Dowód stawki jest bardziej zdecentralizowany niż dowód pracy, ponieważ wyścigi zbrojeń w sprzęcie do wydobycia zwykle wypierają z rynku osoby fizyczne i małe organizacje. Chociaż technicznie każdy może rozpocząć wydobycie przy użyciu skromnego sprzętu, prawdopodobieństwo otrzymania jakiejkolwiek nagrody jest znikomo małe w porównaniu z instytucjonalnymi operacjami wydobywczymi. W przypadku dowodu stawki koszt stakowania i procentowy zwrot z tej stawki są takie same dla wszystkich. Obecnie uruchomienie walidatora kosztuje 32 ETH.

Z drugiej strony, wynalezienie płynnych instrumentów pochodnych stakowania doprowadziło do obaw o centralizację, ponieważ kilku dużych dostawców zarządza dużymi ilościami zastakowanego ETH. Jest to problematyczne i należy to jak najszybciej naprawić, ale jest to również bardziej złożone, niż się wydaje. Scentralizowani dostawcy usług stakowania niekoniecznie mają scentralizowaną kontrolę nad walidatorami – często jest to po prostu sposób na stworzenie centralnej puli ETH, którą wielu niezależnych operatorów węzłów może stakować bez konieczności posiadania przez każdego uczestnika własnych 32 ETH.

Najlepszą opcją dla Ethereum jest uruchamianie walidatorów lokalnie na komputerach domowych, co maksymalizuje decentralizację. Dlatego Ethereum opiera się zmianom, które zwiększają wymagania sprzętowe do uruchomienia węzła/walidatora.

## Zrównoważony rozwój {#sustainability}

Dowód stawki to niskoemisyjny sposób na zabezpieczenie blockchaina. W ramach dowodu pracy górnicy rywalizują o prawo do wydobycia bloku. Górnicy odnoszą większe sukcesy, gdy mogą szybciej wykonywać obliczenia, co zachęca do inwestycji w sprzęt i zużycie energii. Zaobserwowano to w przypadku Ethereum, zanim przeszło ono na dowód stawki. Krótko przed przejściem na dowód stawki Ethereum zużywało około 78 TWh rocznie – tyle, co mały kraj. Jednak przejście na dowód stawki zmniejszyło te wydatki na energię o ~99,98%. Dowód stawki uczynił Ethereum energooszczędną, niskoemisyjną platformą.

[Więcej o zużyciu energii przez Ethereum](/energy-consumption)

## Emisja {#issuance}

Ethereum z dowodem stawki może płacić za swoje bezpieczeństwo, emitując znacznie mniej monet niż Ethereum z dowodem pracy, ponieważ walidatorzy nie muszą płacić wysokich kosztów energii elektrycznej. W rezultacie ETH może zmniejszyć swoją inflację, a nawet stać się deflacyjny, gdy duże ilości ETH są spalane. Niższe poziomy inflacji oznaczają, że bezpieczeństwo Ethereum jest tańsze niż w przypadku dowodu pracy.

## Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

Obejrzyj, jak Justin Drake wyjaśnia zalety dowodu stawki w porównaniu z dowodem pracy:

<YouTube id="1m12zgJ42dI" />

## Dalsza lektura {#further-reading}

- [Filozofia projektowania dowodu stawki według Vitalika](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Często zadawane pytania dotyczące dowodu stawki według Vitalika](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Film „Prosto wyjaśnione” na temat PoS kontra PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
