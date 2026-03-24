---
title: "Oś czasu wszystkich forków Ethereum (od 2014 do dziś)"
description: "Historia blockchainu Ethereum, w tym najważniejsze kamienie milowe, wydania i forki."
lang: pl
sidebarDepth: 1
---

# Oś czasu wszystkich forków Ethereum (od 2014 do dziś) {#the-history-of-ethereum}

Oś czasu wszystkich najważniejszych kamieni milowych, forków i aktualizacji blockchainu Ethereum.

<ExpandableCard title="Czym są forki?" contentPreview="Zmiany zasad protokołu Ethereum, obejmujące planowane aktualizacje techniczne.">

Forki powstają, gdy w sieci trzeba wprowadzić istotne aktualizacje techniczne lub zmiany – zazwyczaj wynikają one z p ropozycji ulepszeń Ethereum [Ethereum Improvement Proposals (EIP)](/eips/) i zmieniają „zasady” protokołu.

Gdy potrzebne są aktualizacje w tradycyjnym, centralnie sterowanym oprogramowaniu, firma po prostu opublikuje nową wersję dla użytkownika końcowego. Blockchainy działają inaczej, ponieważ nie ma centralnego właściciela. [Klienci Ethereum](/developers/docs/nodes-and-clients/) muszą zaktualizować swoje oprogramowanie, aby wdrożyć reguły nowego forka. Dodatkowo twórcy bloków (górnicy w świecie proof-of-work, walidatorzy w świecie proof-of-stake) i węzły muszą tworzyć bloki i przeprowadzać walidację zgodnie z nowymi zasadami. [Więcej o mechanizmach konsensusu](/developers/docs/consensus-mechanisms/)

Te zmiany zasad mogą spowodować tymczasowy podział sieci. Nowe bloki można wytwarzać według nowych lub starych zasad. Forki są zwykle uzgadniane z wyprzedzeniem, tak aby klienci przyjęli zmiany jednomyślnie, a fork z aktualizacjami stał się głównym łańcuchem. Jednak w rzadkich przypadkach nieporozumienia dotyczące forków mogą spowodować trwały podział sieci — przykładem jest powstanie Ethereum Classic z <a href="#dao-fork">forka DAO</a>.
</ExpandableCard>

<ExpandableCard title="Dlaczego niektóre aktualizacje mają wiele nazw?" contentPreview="Nazwy aktualizacji tworzone są według wzoru.">

Oprogramowanie stanowiące podstawę Ethereum składa się z dwóch części, znanych jako [warstwa wykonawcza](/glossary/#execution-layer) i [warstwa konsensusu](/glossary/#consensus-layer).

**Nazewnictwo uaktualnień warstwy wykonawczej**

Od 2021 roku uaktualnienia **warstwy wykonawczej** są nazywane zgodnie z nazwami miast [poprzednich lokalizacji Devcon](https://devcon.org/en/past-events/) w porządku chronologicznym:

| Nazwa uaktualnienia | Rok Devcon | Numer Devcon | Data uaktualnienia                  |
| ------------------- | ---------- | ------------ | ----------------------------------- |
| Berlin              | 2014       | 0            | 15 kwietnia 2021 r. |
| London              | 2015       | I            | 5 sierpnia 2021 r.  |
| Shanghai            | 2016       | II           | 12 kwietnia 2023 r. |
| Cancun              | 2017       | III          | 13 marca 2024 r.    |
| **Praga**           | 2018       | IV           | Do ustalenia - Następna             |
| _Osaka_             | 2019       | V            | Do ustalenia                        |
| _Bogota_            | 2022       | VI           | Do ustalenia                        |
| _Bangkok_           | 2024       | VII          | Do ustalenia                        |

**Nazewnictwo uaktualnień warstwy konsensusu**

Od czasu uruchomienia [Łańcucha śledzącego](/glossary/#beacon-chain) uaktualnienia **warstwy konsensusu** noszą nazwy gwiazd, których pierwsze litery następują po sobie w porządku alfabetycznym:

| Nazwa uaktualnienia                                           | Data uaktualnienia                      |
| ------------------------------------------------------------- | --------------------------------------- |
| Geneza łańcucha śledzącego                                    | 1 grudnia 2020 r.       |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 października 2021 r. |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 września 2022 r.      |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 kwietnia 2023 r.     |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 marca 2024 r.        |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Do ustalenia - Następna                 |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Do ustalenia                            |

**Połączone nazewnictwo**

Uaktualnienia warstwy wykonawczej i konsensusu były początkowo wdrażane w różnych terminach, ale po [Połączeniu](/roadmap/merge/) w 2022 roku są wdrażane jednocześnie. W związku z tym pojawiły się potoczne terminy upraszczające odniesienia do tych aktualizacji poprzez użycie jednej, połączonej nazwy. Zaczęło się to od aktualizacji _Shanghai-Capella_, powszechnie nazywanej „**Shapella**”, a następnie kontynuowano przy aktualizacjach _Cancun-Deneb_ (**Dencun**) i _Prague-Electra_ (**Pectra**).

| Uaktualnienie warstwy wykonawczej | Uaktualnienie warstwy konsensusu | Krótka nazwa |
| --------------------------------- | -------------------------------- | ------------ |
| Shanghai                          | Capella                          | „Shapella”   |
| Cancun                            | Deneb                            | „Dencun”     |
| Praga                             | Electra                          | „Pectra”     |
| Osaka                             | Fulu                             | „Fusaka”     |
</ExpandableCard>

Przejdź od razu do informacji o niektórych szczególnie ważnych uaktualnieniach z przeszłości: [Łańcuch śledzący](/roadmap/beacon-chain/); [Połączenie](/roadmap/merge/); i [EIP-1559](#london)

Szukasz przyszłych uaktualnień protokołu? [Dowiedz się o nadchodzących uaktualnieniach w planie działania Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka („Fusaka”) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Więcej o Fusaka](/roadmap/fusaka/)

### Prague-Electra („Pectra”) {#pectra}

<NetworkUpgradeSummary name="pectra" />

Uaktualnienie Prague-Electra („Pectra”) obejmowało kilka ulepszeń protokołu Ethereum mających na celu poprawę doświadczeń wszystkich użytkowników, sieci warstwy 2, stakerów i operatorów węzłów.

Staking został ulepszony dzięki złożonym kontom walidatorów oraz lepszej kontroli nad zestakowanymi środkami poprzez adres wypłat w warstwie wykonawczej. EIP-7251 zwiększył maksymalne efektywne saldo pojedynczego walidatora do 2048 ETH, poprawiając efektywność kapitałową dla stakerów. EIP-7002 umożliwił, aby konto w warstwie wykonawczej mogło bezpiecznie wyzwalać akcje walidatora, w tym wyjścia lub wypłacanie części środków, co poprawia doświadczenia stakerów ETH, a jednocześnie wzmacnia odpowiedzialność operatorów węzłów.

Inne części uaktualnienia skupiały się na poprawie doświadczenia zwykłych użytkowników. EIP-7702 wprowadził możliwość, aby zwykłe konto niebędące inteligentnym kontraktem ([EOA](/glossary/#eoa)) wykonywało kod podobnie jak inteligentny kontrakt. Otworzyło to nieograniczone nowe funkcje dla tradycyjnych kont Ethereum, takie jak, grupowanie transakcji, sponsorowanie gazu, alternatywne metody uwierzytelniania, programowalne kontrole wydatków, mechanizmy odzyskiwania konta i inne.

<ExpandableCard title="EIP-y Pectra" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

Lepsze doświadczenie użytkownika:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> — <em>ustawienie kodu dla kont EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> — <em>zwiększenie przepustowości blobów</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> — <em>zwiększenie kosztu calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> — <em>dodanie harmonogramu blobów do plików konfiguracyjnych warstwy wykonawczej</em></li>
</ul>

Lepsze doświadczenia stakingowe:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> — <em>zwiększenie <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> — <em>wyjścia wyzwalane z warstwy wykonawczej</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> — <em>ogólne żądania warstwy wykonawczej</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> — <em>zapewnienie depozytów walidatorów w łańcuchu</em></li>
</ul>

Poprawy efektywności i bezpieczeństwa protokołu:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> — <em>prekompilacja dla operacji krzywych BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> — <em>zapisywanie historycznych hashy bloków w stanie</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> — <em>przeniesienie indeksu komitetu poza poświadczenie</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Jak Pectra poprawi doświadczenie związane ze stakowaniem](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Przeczytaj specyfikacje uaktualnienia Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prague-Electra („Pectra”) – często zadawane pytania](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb („Dencun”) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Podsumowanie Cancun {#cancun-summary}

Uaktualnienie Cancun zawiera zestaw ulepszeń dla _warstwy wykonawczej_ Ethereum mających na celu poprawę skalowalności, w połączeniu z uaktualnieniami konsensusu Deneb.

W szczególności obejmuje EIP-4844, znany jako **Proto-Danksharding**, który znacznie obniża koszt przechowywania danych dla rollupów warstwy 2. Osiąga się to poprzez wprowadzenie „blobów” danych, które pozwalają pakietom zbiorczym przesyłać dane do sieci głównej na krótki okres. Wynikiem tego są znacznie niższe opłaty transakcyjne dla użytkowników pakietów zbiorczych warstwy 2.

<ExpandableCard title="EIP-y Cancun" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> — <em>kody operacyjne pamięci przejściowej</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> — <em>korzeń bloku śledzącego w EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> — <em>transakcje shardów blobów(Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> — <em><code>MCOPY</code> — instrukcja kopiowania pamięci</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> — <em><code>SELFDESTRUCT</code> tylko w tej samej transakcji</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> — kod operacyjny <em><code>BLOBBASEFEE</code></em></li>
</ul>
</ExpandableCard>

- [Rollupy warstwy 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Przeczytaj specyfikację uaktualnienia Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Podsumowanie Deneb {#deneb-summary}

Uaktualnienie Deneb zawiera zestaw ulepszeń dla _warstwy konsensusu_ Ethereum mających na celu poprawę skalowalności. Aktualizacja ta jest połączona z aktualizacjami warstwy wykonawczej Cancun, aby umożliwić Proto-Danksharding (EIP-4844) wraz z innymi usprawnieniami łańcucha śledzącego.

Wstępnie wygenerowane podpisane „dobrowolne komunikaty wyjścia” nie tracą już ważności, dając tym samym większą kontrolę użytkownikom inwestującym swoje środki u zewnętrznego operatora węzła. Dzięki tej podpisanej wiadomości wyjściowej stakerzy mogą delegować obsługę węzła, zachowując jednocześnie możliwość bezpiecznego wyjścia i wypłaty swoich środków w dowolnym momencie, bez konieczności proszenia kogokolwiek o pozwolenie.

Rozporządzenie EIP-7514 wprowadza zaostrzenie zasad wydawania ETH, ograniczając liczbę „rotacji” walidatorów, z jaką mogą dołączyć do sieci, do ośmiu (8) na epokę. Ponieważ emisja ETH jest proporcjonalna do całkowitej liczby stakowanych ETH, ograniczenie liczby dołączających walidatorów ogranicza _tempo wzrostu_ nowo wyemitowanych ETH, jednocześnie zmniejszając wymagania sprzętowe dla operatorów węzłów, co sprzyja decentralizacji.

<ExpandableCard title="EIP-y Deneb" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> — <em>korzeń bloku śledzącego w EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> – <em>transakcje blobów shardów</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Perpetually valid signed voluntary exits</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> – <em>zwiększenie maksymalnego slotu na włączenie atestacji</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> – <em>dodanie maksymalnego limitu rotacji epok</em></li>
</ul>
</ExpandableCard>

- [Przeczytaj specyfikacje uaktualnienia Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb („Dencun”) – często zadawane pytania](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella („Shapella”) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Podsumowanie Shanghai {#shanghai-summary}

Uaktualnienie Shanghai przyniosło wypłaty ze stakingu do warstwy wykonawczej. W połączeniu z uaktualnieniem Capella umożliwiło to blokom akceptowanie operacji wypłaty, co pozwala stakerom na wypłacenie ich ETH z łańcucha śledzącego do warstwy wykonawczej.

<ExpandableCard title="EIP-y Shanghai" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651"> EIP-3651</a> — <em>uruchomienie ciepłego adresu <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> — <em>nowa instrukcja <code>PUSH0 </code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860"> EIP-3860</a> — <em>kod inicjujący limitu i licznika</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> — <em>łańcuch śledzący przesyła wypłaty jako operacje</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> — <em>usunięcie <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [Przeczytaj specyfikację uaktualnienia Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Podsumowanie Capella {#capella-summary}

Uaktualnienie Capella była trzecim dużym uaktualnieniem warstwy konsensusu (łańcuch śledzący) i umożliwiło wypłaty ze stakingu. Capella wystąpiła synchronicznie z uaktualnieniem warstwy wykonawczej, Shanghai i włączyło funkcję wypłacania ze stakingu.

To uaktualnienie warstwy konsensusu umożliwiło stakerom, którzy nie dostarczyli danych uwierzytelniających do wypłaty wraz z początkowym depozytem, zrobienie tego, umożliwiając w ten sposób wypłaty.

Uaktualnienie zapewniło również funkcję automatycznego przesunięcia konta, która stale przetwarza konta walidatorów pod kątem wszelkich dostępnych płatności nagród lub pełnych wypłat.

- [Więcej na temat wypłat ze stakingu](/staking/withdrawals/).
- [Przeczytaj specyfikacje uaktualnienia Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Połączenie) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Podsumowanie {#paris-summary}

Uaktualnienie Paris zostało uruchomione, gdy blockchain proof-of-work przekroczył [całkowitą trudność końcową](/glossary/#terminal-total-difficulty) wynoszącą 58750000000000000000000. Stało się to w bloku 15537393 w dniu 15 września 2022 roku, uruchamiając uaktualnienie Paris w następnym bloku. Paris był przejściem do [Połączenia](/roadmap/merge/) – jego główną cechą było wyłączenie algorytmu wydobywania [proof-of-work](/developers/docs/consensus-mechanisms/pow) i powiązanej logiki konsensusu, a włączenie w zamian [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Sam Paris był uaktualnieniem dla [klientów wykonawczych](/developers/docs/nodes-and-clients/#execution-clients) (odpowiednik Bellatrix na warstwie konsensusu), które umożliwiło im przyjmowanie instrukcji od podłączonych [klientów konsensusu](/developers/docs/nodes-and-clients/#consensus-clients). Wymagało to aktywacji nowego zestawu wewnętrznych metod API, znanych jako [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Było to prawdopodobnie najważniejsze uaktualnienie w historii Ethereum od czasu [Homestead](#homestead)!

- [Przeczytaj specyfikację uaktualnienia Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP-y Paris" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675"> EIP-3675</a> — <em>uaktualnienie konsensusu do Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> — <em>zastąpienie kodu operacyjnego DIFFICULTY kodem PREVRANDAO</em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Podsumowanie {#bellatrix-summary}

Uaktualnienie Bellatrix było drugim zaplanowanym uaktualnieniem dla [Łańcucha śledzącego](/roadmap/beacon-chain), przygotowującym łańcuch do [Połączenia](/roadmap/merge/). Wprowadza kary walidatora do ich pełnych wartości za brak aktywności i wykroczenia podlegające cięciu. Bellatrix zawiera również aktualizację zasad wyboru forka w celu przygotowania łańcucha do Połączenia oraz przejścia od ostatniego bloku proof-of-work do pierwszego bloku proof-of-stake. Obejmowało to poinformowanie klientów konsensusu o [całkowitej trudności końcowej](/glossary/#terminal-total-difficulty) wynoszącej 58750000000000000000000.

- [Przeczytaj specyfikację uaktualnienia Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Podsumowanie {#gray-glacier-summary}

Uaktualnienie sieci Gray Glacier opóźniło [bombę trudności](/glossary/#difficulty-bomb) o trzy miesiące. Jest to jedyna zmiana wprowadzona w tym uaktualnieniu i jest ona podobna do uaktualnień [Arrow Glacier](#arrow-glacier) i [Muir Glacier](#muir-glacier). Podobne zmiany zostały przeprowadzone w uaktualnieniach sieci [Byzantium](#byzantium), [Constantinople](#constantinople) i [London](#london).

- [Blog EF - Ogłoszenie o uaktualnieniu Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP-y Gray Glacier" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> — <em> opóźnia bombę trudności do września 2022 r.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Podsumowanie {#arrow-glacier-summary}

Uaktualnienie sieci Arrow Glacier opóźniło [bombę trudności](/glossary/#difficulty-bomb) o kilka miesięcy. Jest to jedyna zmiana wprowadzona w tym uaktualnieniu i jest ona podobna do uaktualnienia [Muir Glacier](#muir-glacier). Podobne zmiany zostały przeprowadzone w uaktualnieniach sieci [Byzantium](#byzantium), [Constantinople](#constantinople) i [London](#london).

- [Blog EF - Ogłoszenie o uaktualnieniu Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Uaktualnienie Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP-y Arrow Glacier" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> — <em>opóźnia bombę trudności do czerwca 2022 r.</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Podsumowanie {#altair-summary}

Uaktualnienie Altair było pierwszym zaplanowanym uaktualnieniem dla [Łańcucha śledzącego](/roadmap/beacon-chain). Dodało również obsługę „komitetów synchronizacji” — umożliwiając stosowanie lekkich klientów oraz zwiększając kary za brak aktywności walidatora i cięcie w miarę postępu w kierunku Połączenia.

- [Przeczytaj specyfikację uaktualnienia Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Ciekawostka! {#altair-fun-fact}

Altair było pierwszym dużym uaktualnieniem sieci, które miało dokładnie określony czas wdrożenia. Wszystkie wcześniejsze uaktualnienia opierały się na zadeklarowanym numerze bloku w łańcuchu proof-of-work, w którym czasy bloków są różne. Łańcuch śledzący nie wymaga rozwiązywania proof-of-work, a zamiast tego działa w oparciu o system epokowy składający się z 32 dwunastosekundowych „slotów” czasu, w których walidatorzy mogą proponować bloki. Właśnie dlatego dokładnie wiedzieliśmy, kiedy wejdziemy w epokę 74.240 i uaktualnienie Altair wejdzie w życie!

- [Czas bloku](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Podsumowanie {#london-summary}

Uaktualnienie London wprowadziło [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), które zreformowało rynek opłat transakcyjnych, wraz ze zmianami w obsłudze zwrotów gazu i harmonogramie [epoki lodowcowej](/glossary/#ice-age).

#### Czym była aktualizacja londyńska / EIP-1559? {#eip-1559}

Przed uaktualnieniem londyńskim Ethereum miało bloki o stałym rozmiarze. W czasie dużego obciążenia sieci, te bloki pracowały z pełną wydajnością. W rezultacie użytkownicy często musieli czekać, aż zapotrzebowanie zmaleje, aby zostać włączeni do bloku, co doprowadzało do kiepskiego doświadczenia. Londyńska aktualizacja wprowadziła do Ethereum bloki o zmiennej wielkości.

Sposób obliczania opłat transakcyjnych w sieci Ethereum zmienił się wraz z [uaktualnieniem London](/ethereum-forks/#london) w sierpniu 2021 roku. Przed uaktualnieniem London opłaty były obliczane bez oddzielania opłat `podstawowych` i `priorytetowych` w następujący sposób:

Powiedzmy, że Alicja musiała zapłacić Bobowi 1 ETH. W tej transakcji limit gazu wynosi 21000 jednostek, a cena gazu to 200 gwei.

Całkowita opłata wyniosłaby: `Jednostki gazu (limit) * Cena gazu za jednostkę`, tj. `21 000 * 200 = 4 200 000 gwei` lub 0,0042 ETH

Wdrożenie [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) w uaktualnieniu London skomplikowało mechanizm opłat transakcyjnych, ale uczyniło opłaty za gaz bardziej przewidywalnymi, co zaowocowało wydajniejszym rynkiem opłat transakcyjnych. Użytkownicy mogą przesyłać transakcje z `maxFeePerGas` odpowiadającym kwocie, jaką są gotowi zapłacić za wykonanie transakcji, wiedząc, że nie zapłacą więcej niż cena rynkowa za gaz (`baseFeePerGas`), i otrzymają zwrot nadwyżki, pomniejszonej o ich napiwek.

Ten film wyjaśnia EIP-1559 i korzyści, jakie przynosi: [Wyjaśnienie EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Jesteś deweloperem zdecentralizowanych aplikacji? Pamiętaj, aby zaktualizować swoje biblioteki i narzędzia.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Przeczytaj wyjaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP-y London" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> — <em>poprawia rynek opłat transakcyjnych</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198"> EIP-3198</a> — <em> zwraca <code> BASEFEE</code> z bloku</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> — <em>zmniejsza zwroty kosztów gazu za operacje EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541"> EIP-3541</a> — <em>zapobiega wdrażaniu kontraktów zaczynających się od <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> — <em>opóźnia epokę lodowcową do grudnia 2021 r.</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Podsumowanie {#berlin-summary}

Uaktualnienie Berlin optymalizuje koszt gazu w pewnych działaniach EVM oraz zwiększa obsługę wielu typów transakcji.

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Przeczytaj wyjaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP-y Berlin" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> — <em>obniża koszty gazu ModExp </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> — <em>umożliwia łatwiejszą obsługę wielu typów transakcji</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> — <em>wzrost kosztów gazu dla stanowych kodów operacyjnych dostępu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> — <em>dodaje opcjonalne listy dostępu</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneza Łańcucha śledzącego {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Podsumowanie {#beacon-chain-genesis-summary}

[Łańcuch śledzący](/roadmap/beacon-chain/) potrzebował 16 384 depozytów po 32 stakowane ETH, aby bezpiecznie wystartować. Stało się to 27 listopada, a Łańcuch śledzący zaczął produkować bloki 1 grudnia 2020 roku.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Łańcuch śledzący
</DocLink>

---

### Wdrożenie kontraktu depozytowego stakingu {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Podsumowanie {#deposit-contract-summary}

Kontrakt depozytowy stakingu wprowadził [staking](/glossary/#staking) do ekosystemu Ethereum. Chociaż był to kontrakt w [sieci głównej](/glossary/#mainnet), miał bezpośredni wpływ na harmonogram uruchomienia [Łańcucha śledzącego](/roadmap/beacon-chain/), ważnego [uaktualnienia Ethereum](/roadmap/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Podsumowanie {#muir-glacier-summary}

Fork Muir Glacier wprowadził opóźnienie [bomby trudności](/glossary/#difficulty-bomb). Wzrost trudności bloku w mechanizmie konsensusu [proof-of-work](/developers/docs/consensus-mechanisms/pow/) groził pogorszeniem użyteczności Ethereum poprzez wydłużenie czasu oczekiwania na wysyłanie transakcji i korzystanie z dapek.

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Przeczytaj wyjaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP-y Muir Glacier" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> — <em>opóźnia bombę trudności o kolejne 4.000.000 bloków, czyli około 611 dni.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Podsumowanie {#istanbul-summary}

Fork Istanbul:

- Zoptymalizowano koszt [gazu](/glossary/#gas) dla niektórych działań w [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Poprawa odporności na ataki typu „odmowa usługi”.
- Zwiększono wydajność rozwiązań [skalowania warstwy 2](/developers/docs/scaling/#layer-2-scaling) opartych na SNARK-ach i STARK-ach.
- Umożliwiono współdziałanie Ethereum i Zcash.
- Umożliwiono wprowadzenie bardziej kreatywnych funkcji do kontraktów.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP-y Istanbul" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> — <em>pozwala Ethereum współpracować z walutami chroniącymi prywatność, takimi jak Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>tańsza kryptografia w celu obniżenia kosztów [gazu](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>chroni Ethereum przed atakami typu replay, dodając [kod operacyjny](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> — <em>optymalizacja cen gazu kodu operacyjnego na podstawie zużycia.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>zmniejsza koszt CallData, aby umożliwić umieszczanie większej ilości danych w blokach – dobre dla [skalowania warstwy 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> — <em>inne zmiany cen gazu w kodzie operacyjnym.</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Podsumowanie {#constantinople-summary}

Fork Constantinople:

- Zmniejszono nagrody za [wydobycie](/developers/docs/consensus-mechanisms/pow/mining/) bloków z 3 do 2 ETH.
- Zapewniono, że blockchain nie zamarznie przed [wdrożeniem proof-of-stake](#beacon-chain-genesis).
- Zoptymalizowano koszt [gazu](/glossary/#gas) dla niektórych działań w [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Dodał możliwość interakcji z adresami, które nie zostały jeszcze utworzone.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP-y Constantinople" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li></em><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> - <em>Optymalizuje koszt pewnych działań na łańcuchu. </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> — <em>umożliwia interakcję z adresami, które nie zostały jeszcze utworzone.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> - <em>Wprowadza <code>EXTCODEHASH</code> instrukcje do uzyskania haszu z kodu innego kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>zapewnia, że blockchain nie zamarznie przed proof-of-stake i zmniejsza nagrodę za blok z 3 do 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Podsumowanie {#byzantium-summary}

Fork Byzantium:

- Zmniejszono nagrody za [wydobycie](/developers/docs/consensus-mechanisms/pow/mining/) bloków z 5 do 3 ETH.
- Opóźniono [bombę trudności](/glossary/#difficulty-bomb) o rok.
- Dodano możliwość wykonywania niezmieniających stanu wywołań do innych kontraktów.
- Dodano pewne metody kryptograficzne, aby umożliwić [skalowanie warstwy 2](/developers/docs/scaling/#layer-2-scaling).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP-y Byzantium" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> — <em>dodaje kod operacyjny <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> — <em>dodaje pole statusu do potwierdzeń transakcji w celu wskazania powodzenia lub niepowodzenia.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>dodaje krzywą eliptyczną i mnożenie skalarne, aby umożliwić [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>dodaje krzywą eliptyczną i mnożenie skalarne, aby umożliwić [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> — <em>umożliwia weryfikację podpisu RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> — <em>dodaje obsługę wartości zwracanych o zmiennej długości.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> — <em>dodaje kod operacyjny <code>STATICCALL</code>, umożliwiający niezmieniające stanu wywołania do innych kontraktów.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> — <em>zmienia formułę dostosowania trudności.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>opóźnia [bombę trudności](/glossary/#difficulty-bomb) o 1 rok i zmniejsza nagrodę za blok z 5 do 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Podsumowanie {#spurious-dragon-summary}

Fork Spurious Dragon był drugą odpowiedzią na ataki typu DoS (odmowa usługi) na sieć (wrzesień/październik 2016 r.). Uwzględniał:

- dostrajanie cen kodu operacyjnego, aby zapobiec przyszłym atakom w sieci;
- umożliwienie „debloat” stanu blockchain;
- dodanie ochrony przed atakami typu replay.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP-y Spurious Dragon" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> — <em>zapobiega ponownemu przesyłaniu transakcji z jednego łańcucha Ethereum do alternatywnego łańcucha, na przykład ponownemu przesyłaniu transakcji sieci testowej do głównego łańcucha Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> — <em>dostosowuje ceny kodu operacyjnego <code>EXP</code> — utrudnia spowolnienie sieci poprzez kosztowne obliczeniowo operacje kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> — <em>umożliwia usunięcie pustych kont dodanych przez ataki DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> — <em>zmienia maksymalny rozmiar kodu, jaki może mieć kontrakt na blockchainie do 24.576 bajtów.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Podsumowanie {#tangerine-whistle-summary}

Fork Tangerine Whistle był pierwszą odpowiedzią na ataki typu DoS (odmowa usługi) na sieć (wrzesień/październik 2016 r.). Uwzględniał:

- rozwiązywanie pilnych problemów dotyczących kondycji sieci związanych z kodami operacyjnymi o zaniżonych cenach.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP-y Tangerine Whistle" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> — <em>zwiększa koszty gazu kodów operacyjnych, które mogą być wykorzystywane w atakach spamowych.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> — <em>zmniejsza rozmiar stanu poprzez usunięcie dużej liczby pustych kont, które zostały umieszczone w stanie przy bardzo niskich kosztach z powodu błędów we wcześniejszych wersjach protokołu Ethereum.</em></li>
</ul>
</ExpandableCard>

---

### Fork DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Podsumowanie {#dao-fork-summary}

Fork DAO był odpowiedzią na [atak na DAO w 2016 roku](https://www.coindesk.com/learn/understanding-the-dao-attack/), w wyniku którego z niezabezpieczonego kontraktu [DAO](/glossary/#dao) skradziono w ramach hacku ponad 3,6 miliona ETH. Fork przeniósł środki z wadliwego kontraktu do [nowego kontraktu](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) z jedną funkcją: wypłata. Każdy, kto stracił środki, mógł wypłacić 1 ETH za każde 100 tokenów DAO w swoim portfelu.

Ten kierunek działania został przegłosowany przez społeczność Ethereum. Każdy posiadacz ETH mógł głosować za pomocą transakcji na [platformie do głosowania](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Decyzja o forku osiągnęła ponad 85% głosów.

Niektórzy górnicy odmówili forka, ponieważ incydent DAO nie był wadą protokołu. W ten sposób utworzyli [Ethereum Classic](https://ethereumclassic.org/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Podsumowanie {#homestead-summary}

Przyszłościowy fork Homestead. Obejmował kilka zmian protokołu i zmianę sieci, która dała Ethereum możliwość wykonywania dalszych uaktualnień sieci.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP-y Homestead" contentPreview="Oficjalne ulepszenia zawarte w tym forku.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> — <em>wprowadza zmiany w procesie tworzenia kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> — <em>dodaje nowy kod operacyjny: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> — <em>wprowadza wymagania kompatybilności devp2p na przyszłość</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Odmrożenie Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Podsumowanie {#frontier-thawing-summary}

Fork odmrażający Frontier zniósł [limit gazu](/glossary/#gas) na [blok](/glossary/#block) wynoszący 5000 i ustawił domyślną cenę gazu na 51 [gwei](/glossary/#gwei). Pozwoliło to na transakcje — transakcje wymagają 21.000 gazu. Wprowadzono [bombę trudności](/glossary/#difficulty-bomb), aby zapewnić przyszły hard fork do [proof-of-stake](/glossary/#pos).

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Przeczytaj Aktualizację 1 protokołu Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Podsumowanie {#frontier-summary}

Frontier był działającą, ale surową implementacją projektu Ethereum. Wprowadzono go po udanej fazie testów wersji Olympic. Był przeznaczony dla użytkowników technicznych, w szczególności deweloperów. [Bloki](/glossary/#block) miały [limit gazu](/glossary/#gas) wynoszący 5000. Ten okres „rozmrażania” umożliwił górnikom rozpoczęcie działalności, a wczesnym użytkownikom instalowanie klientów bez konieczności „pośpiechu”.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Sprzedaż Etheru {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether był oficjalnie sprzedawany przez 42 dni. Można było go kupić za BTC.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Opublikowano Yellowpaper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Dokumentacja Yellow Paper autorstwa dr Gavina Wood jest definicją techniczną protokołu Ethereum.

[Zobacz Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Opublikowano Whitepaper {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Dokument wprowadzający, opublikowany w 2013 roku przez Vitalika Buterina, założyciela Ethereum, przed uruchomieniem projektu w 2015 roku.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
