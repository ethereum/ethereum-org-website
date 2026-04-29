---
title: "Co wejdzie w skład aktualizacji Pectra?"
description: "Christine Kim o aktualizacji Pectra w Ethereum, omawiająca EIP zawarte w aktualizacji, co zmieniają w protokole i dlaczego mają znaczenie dla użytkowników, deweloperów i walidatorów."
lang: pl
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Przegląd Pectra"
---

Prezentacja **Christine Kim** na Devcon SEA omawiająca EIP zawarte w aktualizacji Pectra w Ethereum, co zmieniają w protokole, kiedy spodziewana jest aktywacja w Sieci głównej i które EIP zostały usunięte z zakresu.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=ufIDBCgdGwY) opublikowanego przez Fundację Ethereum. Został on lekko zredagowany w celu poprawy czytelności.*

#### Wprowadzenie (0:00) {#introduction-000}

Porozmawiamy o wszystkich EIP, które wejdą w skład aktualizacji Pectra. Szybkie zastrzeżenie, zanim zacznę: wszystko, co zamierzam powiedzieć, ma charakter wyłącznie informacyjny — w celach informacyjnych — i nie powinno być interpretowane jako porada finansowa lub inwestycyjna.

#### Kiedy Pectra trafi do Sieci głównej (0:23) {#when-is-pectra-mainnet-023}

Zanim przejdziemy do tego, co wejdzie w skład Pectra, najczęściej zadawane mi pytanie brzmi: „kiedy Pectra trafi do Sieci głównej?”. Więc po prostu miejmy to z głowy, abyśmy mogli przejść do kwestii technicznych.

To bardzo wstępna analiza harmonogramu. Kiedy ludzie pytają mnie, kiedy nastąpi Pectra, odpowiadam, że jest za wcześnie, by to stwierdzić — ponieważ to prawda. Pectra jest wciąż na bardzo wczesnym etapie rozwoju. Specyfikacje się zmieniają, a zakres Pectra nie został jeszcze tak naprawdę sfinalizowany.

Dzięki temu procesowi jedną z rzeczy, których można się nauczyć, jest to, jak aktualizacje są rozwijane, jak są testowane i ostatecznie, jak trafiają do Sieci głównej. Początkowo deweloperzy decydują się na kilka EIP, które mają zostać włączone do aktualizacji, a następnie wdrażają te EIP w prywatnych sieciach testowych skoncentrowanych na deweloperach, zwanych sieciami deweloperskimi (devnets). Deweloperzy uruchomili już kilka sieci deweloperskich dla Pectra, więc te EIP przeszły już kilka rund wdrożeń. Deweloperzy zauważyli przypadki brzegowe i błędy, które chcą naprawić, i iterują nad tymi EIP, uruchamiając nowe sieci deweloperskie. Devnet 4 został uruchomiony w zeszłym miesiącu, w październiku.

Zazwyczaj tak się nie dzieje, ale deweloperzy — specjalnie na tę konferencję i dla wszystkich na widowni — uruchomili w tym miesiącu pierwszą publiczną sieć testową Pectra. Nazywa się Mekong, więc możecie już teraz wejść w interakcję z niektórymi EIP, które znajdą się w Pectra. Opiera się ona na specyfikacjach sieci deweloperskiej 4 (devnet 4), ale należy pamiętać, że te specyfikacje ulegają zmianom.

Istnieje lista zmian w specyfikacji EIP, które deweloperzy chcą już włączyć do sieci deweloperskiej 5 (devnet 5) Pectra — rzeczy takie jak zmiana wyceny prekompilatu BLS oraz nowe EIP, które nie zostało wdrożone w sieci deweloperskiej 4, ale deweloperzy zamierzają je wdrożyć w sieci deweloperskiej 5 lub w przyszłej aktualizacji. Zatem specyfikacje Pectra się zmieniają. Przewiduję, że przed ostatecznym zamrożeniem specyfikacji powstanie jeszcze wiele sieci deweloperskich.

Inną częścią, która jest naprawdę ważna dla aktualizacji Pectra w jej drodze do Sieci głównej, jest sfinalizowanie zakresu — podjęcie decyzji o wszystkich EIP, które wejdą w skład Pectra. Jest jedno EIP — w zasadzie to jeszcze nie jest EIP — ale jest to zwiększenie pojemności blobów, którego deweloperzy nie włączyli jeszcze formalnie do Pectra, ale wydaje się, że prawdopodobnie uwzględnią jakiś rodzaj zwiększenia pojemności blobów, ponieważ niedawno włączyli EIP, które wprowadza mechanizm dynamicznej aktualizacji docelowej i maksymalnej ilości gazu dla blobów poprzez warstwę konsensusu, zamiast kodowania tych parametrów na stałe w warstwie wykonawczej i warstwie konsensusu.

Gdy zakres zostanie sfinalizowany, rozpoczyna się testowanie wszystkich wdrożonych nowych EIP — pełnego zakresu aktualizacji Pectra — i poddaje się je rygorystycznym testom w kilku kolejnych sieciach deweloperskich. Przewiduję, że potrwa to może do sieci deweloperskiej 6 lub 7. A następnie, gdy specyfikacje Pectra zostaną zamrożone i będą gotowe — wszystkie przypadki brzegowe, które deweloperzy mogą znaleźć w sieciach deweloperskich, zostaną znalezione — udostępnią aktualizację Pectra w publicznych sieciach testowych Ethereum. Obecnie są dwie: Sepolia i Holesky.

Historycznie rzecz biorąc, deweloperzy przeznaczali około dwóch tygodni między aktualizacjami publicznych sieci testowych. W rzadkich przypadkach deweloperzy skracali ten czas do zaledwie jednego tygodnia między sieciami testowymi, ale ze względu na rozmiar Pectra wyobrażam sobie, że deweloperzy będą chcieli wykorzystać pełny czas. Zakładam mniej więcej miesiąc dla Sepolii i Holesky, a po tym czasie wreszcie będzie mogła nastąpić aktywacja w Sieci głównej.

Biorąc pod uwagę wszystkie informacje, które posiadam w tej chwili, oraz postępy, jakie deweloperzy poczynili do tej pory w pracach nad Pectra, moja najlepsza analiza i przypuszczenie jest takie, że Pectra w Sieci głównej pojawi się realnie w kwietniu 2025 roku. Ponownie, jest to bardzo wstępne, ponieważ wiele może się zmienić. Rozwój odbywa się z tygodnia na tydzień — deweloperzy uczestniczą w spotkaniach ACD, rozmawiając o błędzie, którego się nie spodziewali w danym EIP, lub o nowym EIP, które chcą dodać do Pectra.

#### EIP warstwy wykonawczej (6:23) {#execution-layer-eips-623}

Przejdźmy do sedna tej prezentacji — co wejdzie w skład aktualizacji Pectra. Do Pectra wejdzie dziesięć EIP, a cztery z nich koncentrują się na warstwie wykonawczej.

**EIP-2537** to nowy prekompilat w EVM — operacje na krzywej BLS12-381. Jest to nowy schemat podpisów kryptograficznych, o który deweloperzy inteligentnych kontraktów prosili od bardzo dawna. To EIP zostało utworzone w 2020 roku i w tamtym czasie deweloperzy zdecentralizowanych aplikacji (dapp) mówili, że bardzo go chcą, ponieważ zapewniłoby to niektórym aplikacjom dapp opartym na kryptografii z wiedzą zerową silniejsze gwarancje prywatności, potencjalnie zwiększone bezpieczeństwo i skalowalność. Podpisy BLS to także agregacja, która odbywa się w warstwie konsensusu dla poświadczeń walidatorów. Na to EIP czekano bardzo długo. Jedną z obaw jest to: czy wciąż są aplikacje czekające na prekompilat BLS i czy będą z niego korzystać, gdy zostanie uruchomiony? Ale jeśli jesteś na widowni i nie wiedziałeś, że prekompilat BLS w końcu nadchodzi — to nadchodzi.

**EIP-2935** — serwowanie historycznych hashy bloków ze stanu. Wprowadza to zmianę w warstwie wykonawczej, dzięki której dowody historycznych bloków mogą być generowane ze stanu. Ma to pewne krótkoterminowe korzyści dla synchronizacji lekkich klientów oraz dla inteligentnych kontraktów, które mogą chcieć wykorzystać dane o stanie poprzedniego bloku bezpośrednio przez EVM — obecnie nie można tego zrobić. Ale te krótkoterminowe korzyści nie są głównym powodem, dla którego to EIP zostało włączone do Pectra. Głównym powodem jest to, że jest to warunek wstępny dla Verkle — gruntownej przebudowy struktury danych stanu Ethereum. Deweloperzy myśleli, że to przejście nastąpi zaraz po Pectra, ale Verkle nie wejdzie do Fusaka. Przesunęli to na kolejną aktualizację, ale ten krok został już odhaczony z listy.

**EIP-7685** — żądania warstwy wykonawczej ogólnego przeznaczenia. To EIP tak naprawdę nie wprowadza nowych funkcji do Ethereum — jest to EIP wspierające inne EIP w Pectra. W Pectra znajduje się kilka EIP, w których warstwa wykonawcza będzie w stanie przekazywać znacznie więcej wiadomości — różnego rodzaju wiadomości — do warstwy konsensusu, czego wcześniej nie mogła robić. Inteligentne kontrakty w warstwie wykonawczej będą mogły wyzwalać wypłaty walidatorów, konsolidacje i depozyty. Zamiast wdrażać te nowe kanały komunikacji w oddzielny, unikalny sposób, to EIP tworzy uogólnioną strukturę — uogólnioną szynę — do obsługi tych żądań. Będzie to łatwiejsze do przetestowania, łatwiejsze do wdrożenia w różnych klientach i łatwiejsze do ustandaryzowania, zwłaszcza jeśli deweloperzy będą chcieli wprowadzić nowe typy żądań wyzwalanych przez warstwę wykonawczą.

**EIP-7702** — ustawienie kodu dla kont posiadanych zewnętrznie (EOA). Do Ethereum wchodzi nowy typ transakcji. Ten typ transakcji tymczasowo pozwoli EOA na większą elastyczność, umożliwiając funkcje takie jak wsadowanie transakcji, transakcje sponsorowane, transakcje warunkowe i delegowane bezpieczeństwo. Możesz pomyśleć: „czy to wizja abstrakcji konta ożywa w Ethereum?”. Nie, to nie to — to mały krok. To wczesny krok, aby zobaczyć, jak mogłaby wyglądać prawdziwa mapa drogowa do prawdziwej natywnej abstrakcji konta w Ethereum. Było sporo dyskusji na temat tego, jak deweloperzy powinni zrobić ten pierwszy krok, i wiele kontrowersji wokół jego włączenia i projektu — ale jest w środku.

#### EIP warstwy konsensusu (12:00) {#consensus-layer-eips-1200}

Jest jeszcze sześć innych — to są EIP warstwy konsensusu.

**EIP-7742** — rozdzielenie liczby blobów między warstwą konsensusu a warstwą wykonawczą. Jest to najnowsze EIP włączone do Pectra. Obecnie pojemność blobów jest zakodowana na stałe w warstwie wykonawczej i warstwie konsensusu we wszystkich różnych klientach. Aktualizacja tego stałego kodowania nie jest tak łatwa, jak mogłoby się wydawać. Stworzenie mechanizmu do dynamicznego ustawiania pojemności blobów poprzez warstwę konsensusu zapewni, że w przyszłości deweloperzy będą mogli łatwo zmienić pojemność blobów w Ethereum, a taka aktualizacja będzie wymagać jedynie zmian w warstwie konsensusu — a nie zmian w obu warstwach.

**EIP-6110** — dostarczanie depozytów walidatorów onchain. The Merge się dokonał, a Ethereum jest bardziej dojrzałe jako blockchain oparty na dowodzie stawki (PoS). Niektóre założenia bezpieczeństwa mogą zostać teraz złagodzone. To EIP usuwa dodatkową rundę głosowania, która odbywa się po stronie warstwy konsensusu za każdym razem, gdy deponujesz 32 ETH w kontrakcie depozytowym, zapewniając, że cała walidacja depozytów odbywa się w warstwie wykonawczej. Przynosi to korzyści dla UX walidatorów — skróci czas między zdeponowaniem 32 ETH a momentem, w którym zobaczysz, że walidator został faktycznie aktywowany w Beacon Chain.

**EIP-7002** — wypłaty wyzwalane przez warstwę wykonawczą. To bardzo dobre rozwiązanie dla puli stakingowych. Obecnie, jeśli chcesz w pełni wycofać walidatora, operator węzła, który obsługuje tego walidatora, musi użyć swojego klucza wypłaty, aby w pełni wyjść z walidatora. Dzięki temu EIP inteligentne kontrakty będą mogły inicjować te pełne wypłaty. Jest to założenie wymagające zaufania, które można teraz usunąć z puli stakingowych — pule takie jak Lido, Rocket Pool i inne pule stakingowe oparte na inteligentnych kontraktach mogą teraz wyzwalać pełne wypłaty walidatorów, jeśli sobie tego życzą.

**EIP-7251** — zwiększenie maksymalnego efektywnego salda. To naprawdę duży problem. Kiedy deweloperzy myśleli o Beacon Chain, nie spodziewali się, że zestaw walidatorów będzie rósł tak szybko — mamy około 1,2 lub 1,3 miliona walidatorów. Jest wielu aktywnych walidatorów, wiele wiadomości jest przekazywanych w warstwie sieciowej i jest tego po prostu za dużo. Obciąża to węzły, a pozostawione bez kontroli stanowiłoby poważny problem dla kondycji Ethereum. EIP-7251 ma na celu zachęcenie walidatorów do konsolidacji ich ETH i posiadania maksymalnego efektywnego salda wyższego niż 32 ETH, co zmniejszy liczbę aktywnych walidatorów w Ethereum.

**EIP-7549** — przeniesienie indeksu komitetu poza poświadczenie. Jest to restrukturyzacja i refaktoryzacja sposobu agregacji poświadczeń w celu zmniejszenia obciążenia sieci w Ethereum i zaoszczędzenia przepustowości węzłów. Kiedy deweloperzy włączali to do Pectra, myśleli, że to świetna zmiana ze wspaniałymi korzyściami i łatwa do wprowadzenia — ale w praktyce okazała się znacznie trudniejsza do wdrożenia, niż oczekiwano.

#### Podsumowanie (17:19) {#summary-1719}

Pectra to mieszanka różnych aktualizacji. Zrobi trzy rzeczy: po pierwsze, naprawi krytyczne niedociągnięcia Ethereum jako blockchaina opartego na dowodzie stawki (PoS) — pomyśl o MaxEB, to krytyczna poprawka, ponieważ rozmiar zestawu walidatorów może nadal rosnąć w niekontrolowany sposób. Po drugie, poprawi doświadczenie użytkownika — nowy typ transakcji, bardziej elastyczne projekty, pewne ulepszenia dla bardziej niewymagających zaufania projektów dla puli stakingowych. I po trzecie, zwiększy pojemność dostępności danych w Ethereum — nie zostało to formalnie włączone do Pectra, ale wydaje się prawdopodobne.

#### EIP usunięte z Pectra (18:02) {#eips-removed-from-pectra-1802}

Oto wszystkie EIP, które zostały usunięte z Pectra. To w pewnym sensie pierwszy raz, kiedy z aktualizacji usunięto tak wiele EIP.

**PeerDAS** — początkowo w Pectra miało nastąpić znacznie większe zwiększenie pojemności dostępności danych. PeerDAS pozwoliłby deweloperom na wielokrotne zwiększenie docelowej liczby blobów w Ethereum bez większego wpływu na zużycie przepustowości i wymagania obliczeniowe związane z uruchomieniem węzła Ethereum. Ale wciąż jest to w fazie badań i rozwoju.

**EOF** — EVM Object Format. Te jedenaście zmian w kodzie jako pakiet stanowi poważną aktualizację EVM w Ethereum. Zarówno PeerDAS, jak i EOF były początkowo włączone do Pectra, ale były testowane w oddzielnych sieciach deweloperskich. Deweloperzy uznali, że będą wymagały znacznie więcej czasu, aby przygotować się do aktywacji w Sieci głównej, i nie chcieli opóźniać innych EIP z Pectra. Stwierdzili więc, że PeerDAS i EOF wyraźnie potrzebują więcej czasu — przesuną je do innej aktualizacji i nie będą powstrzymywać innych EIP z Pectra przed wejściem do Sieci głównej.

Zostały one teraz przeniesione do Fusaka. Verkle początkowo planowano dla Fusaka, ale od tego czasu zostało to jeszcze bardziej opóźnione. EOF i PeerDAS są na razie w Fusaka. Istnieją inne EIP, które deweloperzy ponownie rozważą pod kątem włączenia do Fusaka — przejście na SSZ, listy włączeń, zmiany w emisji, wygasanie historii, ePBS i kierunek abstrakcji konta.

#### Pytania i odpowiedzi (22:02) {#qa-2202}

**Prowadzący:** Kiedy EOF?

**Christine Kim:** Dosłownie przed chwilą powiedziałam, że deweloperzy spróbują umieścić to w Fusaka. Czy uważam, że to prawdopodobne? Raczej nie. Czy uważam, że Fusaka nastąpi w 2025 roku? Absolutnie nie. Biorąc pod uwagę ilość czasu, jaką zajęło przygotowanie Pectra — Fusaka zajmie podobną, jeśli nie dłuższą ilość czasu.

**Prowadzący:** Czy istnieje awaryjna ścieżka zwiększenia docelowej liczby blobów między chwilą obecną a aktywacją Pectra?

**Christine Kim:** Nie. Docelowa liczba blobów jest parametrem zakodowanym na stałe w warstwie wykonawczej i warstwie konsensusu. Aby pojemność blobów uległa zmianie, deweloperzy muszą przeprowadzić twarde rozwidlenie. Nie sądzę, aby istniał jakikolwiek sposób na zwiększenie pojemności blobów między chwilą obecną a Pectra bez twardego rozwidlenia.

**Prowadzący:** Czy propozycja dotyczy zmiany tylko limitu blobów, czy także docelowej liczby blobów?

**Christine Kim:** Świetne pytanie. Najbardziej konserwatywny wzrost to z trzech do czterech — zmiana tylko wartości docelowej, bez zmiany wartości maksymalnej. Ale to nie jest to, o co prosili deweloperzy warstwy 2 (L2). Jest przedstawiciel zespołu Base — zespołu Base z Coinbase — i on zabiegał o bardziej agresywne wzrosty. Pokazał dane sugerujące, że wzrost nie wpłynąłby negatywnie na decentralizację Ethereum. Istnieje konserwatywna propozycja, aby zmienić tylko wartość docelową, a następnie jest bardziej ambitna propozycja, aby zmienić zarówno wartość maksymalną, jak i docelową — na przykład osiem i cztery, lub sześć i dwanaście. Istnieją różne stopnie.

**Prowadzący:** Zachęcałaś ludzi do większego zaangażowania w zarządzanie. Jak społeczność może się bardziej zaangażować?

**Christine Kim:** ETH Research i ETH Magicians to dwa naprawdę świetne fora dyskusyjne do głosowania na określone EIP i okazywania swojego wsparcia. Spotkania ACD to prawdopodobnie miejsce o najwyższej wartości informacyjnej — wszystko, co musisz zrobić, to zostawić komentarz w agendzie spotkania ACD na GitHubie i powiedzieć, że to jest EIP, o którym chciałbyś porozmawiać lub je zaprezentować. Moderator spotkania zazwyczaj bardzo chętnie udziela głosu. Nie zajmuj jednak zbyt dużo czasu — może pięć minut, aby powiedzieć, co masz do powiedzenia.