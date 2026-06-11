---
title: Oś czasu wszystkich rozwidleń Ethereum (od 2014 do dziś)
description: Historia blockchaina Ethereum, w tym najważniejsze kamienie milowe, wydania i rozwidlenia.
lang: pl
sidebarDepth: 1
authors: ["Nixo"]
---

Oś czasu wszystkich najważniejszych kamieni milowych, rozwidleń i aktualizacji blockchaina [Ethereum](/).

<ExpandableCard title="Czym są rozwidlenia?" contentPreview="Zmiany w zasadach protokołu Ethereum, które często obejmują zaplanowane aktualizacje techniczne.">

Rozwidlenia (forki) mają miejsce, gdy w sieci muszą zostać wprowadzone poważne aktualizacje techniczne lub zmiany – zazwyczaj wynikają one z [Propozycji Ulepszeń Ethereum (EIP)](/eips/) i zmieniają „reguły” protokołu.

Gdy potrzebne są aktualizacje w tradycyjnym, centralnie sterowanym oprogramowaniu, firma po prostu publikuje nową wersję dla użytkownika końcowego. Blockchainy działają inaczej, ponieważ nie ma w nich centralnej własności. [Klienci Ethereum](/developers/docs/nodes-and-clients/) muszą zaktualizować swoje oprogramowanie, aby wdrożyć nowe zasady rozwidlenia. Ponadto twórcy bloków (górnicy w świecie dowodu pracy (PoW), walidatorzy w świecie dowodu stawki (PoS)) oraz węzły muszą tworzyć bloki i weryfikować je zgodnie z nowymi zasadami. [Więcej o mechanizmach konsensusu](/developers/docs/consensus-mechanisms/)

Te zmiany zasad mogą spowodować tymczasowy podział w sieci. Nowe bloki mogłyby być produkowane według nowych lub starych zasad. Rozwidlenia są zazwyczaj uzgadniane z wyprzedzeniem, aby klienci przyjęli zmiany jednomyślnie, a rozwidlenie z aktualizacjami stało się głównym łańcuchem. Jednak w rzadkich przypadkach nieporozumienia dotyczące rozwidleń mogą spowodować trwały podział sieci – czego najbardziej znanym przykładem jest powstanie Ethereum Classic w wyniku <a href="#dao-fork">forka DAO</a>.

</ExpandableCard>

<ExpandableCard title="Dlaczego niektóre aktualizacje mają wiele nazw?" contentPreview="Nazwy aktualizacji tworzone są według wzorca">

Oprogramowanie leżące u podstaw Ethereum składa się z dwóch połów, znanych jako [warstwa wykonawcza](/glossary/#execution-layer) i [warstwa konsensusu](/glossary/#consensus-layer).

**Nazewnictwo aktualizacji warstwy wykonawczej**

Od 2021 roku aktualizacje **warstwy wykonawczej** są nazywane od nazw miast [poprzednich lokalizacji Devcon i Devconnect](https://devcon.org/en/past-events/) w porządku chronologicznym:

| Nazwa aktualizacji | Rok Devcon(nect) | Numer Devcon | Data aktualizacji |
| -------------- | ----------------- | ------------- | ------------ |
| Berlin         | 2014              | 0             | 15 kwi 2021 |
| London         | 2015              | I             | 5 sie 2021  |
| Szanghaj       | 2016              | II            | 12 kwi 2023 |
| Cancun         | 2017              | III           | 13 mar 2024 |
| Praga          | 2018              | IV            | 7 maj 2025  |
| Osaka          | 2019              | V             | 3 gru 2025  |
| **Amsterdam**  | 2022              | Devconnect    | Do ustalenia - Następna |
| _Bogotá_       | 2022              | VI            | Do ustalenia |
| _Stambuł_      | 2023              | Devconnect    | Do ustalenia |
| _Bangkok_      | 2024              | VII           | Do ustalenia |
| _Buenos Aires_ | 2025              | Devconnect    | Do ustalenia |
| _Mumbaj_       | 2026              | VIII          | Do ustalenia |

**Nazewnictwo aktualizacji warstwy konsensusu**

Od uruchomienia [Beacon Chain](/glossary/#beacon-chain), aktualizacje **warstwy konsensusu** są nazywane od gwiazd, których nazwy zaczynają się na kolejne litery alfabetu:

| Nazwa aktualizacji                                        | Data aktualizacji |
| --------------------------------------------------------- | ------------ |
| Genesis Beacon Chain                                      | 1 gru 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 paź 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 wrz 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 kwi 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 mar 2024 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 maj 2025  |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 gru 2025  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Do ustalenia - Następna |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Do ustalenia |

**Nazewnictwo łączone**

Aktualizacje warstwy wykonawczej i konsensusu były początkowo wprowadzane w różnym czasie, ale po [The Merge](/roadmap/merge/) w 2022 roku są wdrażane jednocześnie. W związku z tym pojawiły się potoczne określenia, które upraszczają odwoływanie się do tych aktualizacji za pomocą jednego połączonego terminu. Zaczęło się to od aktualizacji _Szanghaj-Capella_, powszechnie określanej jako „**Shapella**”, i jest kontynuowane w kolejnych aktualizacjach.

| Aktualizacja warstwy wykonawczej | Aktualizacja warstwy konsensusu | Krótka nazwa |
| ----------------- | ----------------- | ------------- |
| Szanghaj          | Capella           | "Shapella"    |
| Cancun            | Deneb             | "Dencun"      |
| Praga             | Electra           | "Pectra"      |
| Osaka             | Fulu              | "Fusaka"      |
| Amsterdam         | Gloas             | "Glamsterdam" |
| Bogotá            | Heze              | "Hegotá"      |

</ExpandableCard>

Przejdź od razu do informacji o niektórych szczególnie ważnych przeszłych aktualizacjach: [Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); oraz [EIP-1559](#london)

Szukasz przyszłych aktualizacji protokołu? [Dowiedz się o nadchodzących aktualizacjach na mapie drogowej Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka („Fusaka”) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Więcej o Fusaka](/roadmap/fusaka/)

### Prague-Electra („Pectra”) {#pectra}

<NetworkUpgradeSummary name="pectra" />

Aktualizacja Prague-Electra („Pectra”) wprowadziła kilka ulepszeń do protokołu Ethereum, mających na celu poprawę doświadczeń wszystkich użytkowników, sieci warstwy 2 (L2), stakerów i operatorów węzłów.

Staking zyskał aktualizację dzięki kontom walidatorów z kapitalizacją odsetek (compounding) oraz lepszej kontroli nad stakowanymi środkami za pomocą adresu wypłaty w warstwie wykonawczej. EIP-7251 zwiększył maksymalne saldo efektywne dla pojedynczego walidatora do 2048, poprawiając efektywność kapitałową dla stakerów. EIP-7002 umożliwił kontu wykonawczemu bezpieczne wyzwalanie akcji walidatora, w tym wyjście lub wypłatę części środków, co poprawiło doświadczenia stakerów ETH, jednocześnie pomagając wzmocnić odpowiedzialność operatorów węzłów.

Inne części aktualizacji skupiły się na poprawie doświadczeń zwykłych użytkowników. EIP-7702 wprowadził możliwość wykonywania kodu podobnego do inteligentnego kontraktu przez zwykłe konto niebędące inteligentnym kontraktem ([EOA](/glossary/#eoa)). Odblokowało to nieograniczone nowe funkcjonalności dla tradycyjnych kont Ethereum, takie jak wsadowanie transakcji, sponsorowanie gazu, alternatywne uwierzytelnianie, programowalne kontrole wydatków, mechanizmy odzyskiwania kont i wiele innych.

<ExpandableCard title="EIP Pectra" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

Lepsze doświadczenie użytkownika:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> – <em>Ustawienie kodu konta EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> – <em>Zwiększenie przepustowości blobów</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> – <em>Zwiększenie kosztu danych wywołania (calldata)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> – <em>Dodanie harmonogramu blobów do plików konfiguracyjnych warstwy wykonawczej (EL)</em></li>
</ul>

Lepsze doświadczenie stakingu:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> – <em>Zwiększenie <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> – <em>Wyjścia wyzwalane przez warstwę wykonawczą</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> – <em>Żądania warstwy wykonawczej ogólnego przeznaczenia</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> – <em>Dostarczanie depozytów walidatorów onchain</em></li>
</ul>

Poprawa wydajności i bezpieczeństwa protokołu:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> – <em>Prekompilat dla operacji na krzywej BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> – <em>Zapisywanie historycznych hashów bloków w stanie</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> – <em>Przeniesienie indeksu komitetu poza poświadczenie (Attestation)</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Jak Pectra poprawi doświadczenie stakingu](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Przeczytaj specyfikacje aktualizacji Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [FAQ Prague-Electra („Pectra”)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb („Dencun”) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Podsumowanie Cancun {#cancun-summary}

Aktualizacja Cancun zawiera zestaw ulepszeń _warstwy wykonawczej_ Ethereum mających na celu poprawę skalowalności, wprowadzanych wraz z aktualizacjami konsensusu Deneb.

W szczególności obejmuje to EIP-4844, znane jako **proto-danksharding**, które znacznie zmniejsza koszty przechowywania danych dla rollupów warstwy 2. Osiągnięto to poprzez wprowadzenie „blobów” danych, co umożliwia rollupom publikowanie danych w Sieci głównej na krótki czas. Skutkuje to znacznie niższymi opłatami transakcyjnymi dla użytkowników rollupów warstwy 2.

<ExpandableCard title="EIP Cancun" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Kody operacji pamięci tymczasowej</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Korzeń bloku śledzącego w EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transakcje blobów shardów (proto-danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instrukcja kopiowania pamięci</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> tylko w tej samej transakcji</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Kod operacji <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollupy warstwy 2](/layer-2/)
- [Proto-danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Przeczytaj specyfikację aktualizacji Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Podsumowanie Deneb {#deneb-summary}

Aktualizacja Deneb zawiera zestaw ulepszeń _konsensusu_ Ethereum mających na celu poprawę skalowalności. Ta aktualizacja jest wprowadzana w parze z aktualizacjami warstwy wykonawczej Cancun, aby umożliwić proto-danksharding (EIP-4844), wraz z innymi ulepszeniami Beacon Chain.

Wstępnie wygenerowane, podpisane „wiadomości o dobrowolnym wyjściu” nie tracą już ważności, co daje większą kontrolę użytkownikom stakującym swoje środki u zewnętrznego operatora węzła. Dzięki tej podpisanej wiadomości o wyjściu, stakerzy mogą delegować obsługę węzła, zachowując jednocześnie możliwość bezpiecznego wyjścia i wypłaty swoich środków w dowolnym momencie, bez konieczności proszenia kogokolwiek o pozwolenie.

EIP-7514 wprowadza zaostrzenie emisji ETH poprzez ograniczenie wskaźnika „rotacji”, z jakim walidatory mogą dołączać do sieci, do ośmiu (8) na epokę. Ponieważ emisja ETH jest proporcjonalna do całkowitej ilości stakowanego ETH, ograniczenie liczby dołączających walidatorów ogranicza _tempo wzrostu_ nowo emitowanego ETH, jednocześnie zmniejszając wymagania sprzętowe dla operatorów węzłów, co sprzyja decentralizacji.

<ExpandableCard title="EIP Deneb" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Korzeń bloku śledzącego w EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transakcje blobów shardów</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Bezterminowo ważne podpisane dobrowolne wyjścia</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Zwiększenie maksymalnego slotu włączenia poświadczenia</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Dodanie maksymalnego limitu rotacji w epoce</em></li>
</ul>

</ExpandableCard>

- [Przeczytaj specyfikacje aktualizacji Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [FAQ Cancun-Deneb („Dencun”)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Szanghaj-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Podsumowanie aktualizacji Szanghaj {#shanghai-summary}

Aktualizacja Szanghaj wprowadziła wypłaty ze stakingu do warstwy wykonawczej. W połączeniu z aktualizacją Capella umożliwiło to blokom akceptowanie operacji wypłat, co pozwala stakującym na wypłatę ich ETH z Beacon Chain do warstwy wykonawczej.

<ExpandableCard title="EIP Szanghaj" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Ustawia adres <code>COINBASE</code> jako rozgrzany (warm) na starcie</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nowa instrukcja <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limit i pomiar kosztów dla initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Wypłaty z Beacon Chain jako operacje</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Wycofanie <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Przeczytaj specyfikację aktualizacji Szanghaj](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Podsumowanie aktualizacji Capella {#capella-summary}

Aktualizacja Capella była trzecią dużą aktualizacją warstwy konsensusu (Beacon Chain) i umożliwiła wypłaty ze stakingu. Capella odbyła się synchronicznie z aktualizacją warstwy wykonawczej, Szanghaj, i włączyła funkcjonalność wypłat ze stakingu.

Ta aktualizacja warstwy konsensusu dała stakującym, którzy nie podali danych uwierzytelniających wypłaty przy swoim początkowym depozycie, możliwość ich uzupełnienia, tym samym umożliwiając wypłaty.

Aktualizacja zapewniła również funkcję automatycznego omiatania kont (account sweeping), która w sposób ciągły przetwarza konta walidatorów pod kątem wszelkich dostępnych wypłat nagród lub pełnych wypłat.

- [Więcej o wypłatach ze stakingu](/staking/withdrawals/).
- [Przeczytaj specyfikację aktualizacji Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Podsumowanie {#paris-summary}

Aktualizacja Paris została uruchomiona, gdy blockchain oparty na dowodzie pracy (PoW) przekroczył [końcową całkowitą trudność](/glossary/#terminal-total-difficulty) wynoszącą 58750000000000000000000. Miało to miejsce na bloku 15537393 w dniu 15 września 2022 r., co uruchomiło aktualizację Paris w następnym bloku. Paris był przejściem znanym jako [The Merge](/roadmap/merge/) – jego główną cechą było wyłączenie algorytmu kopania opartego na [dowodzie pracy](/developers/docs/consensus-mechanisms/pow) i powiązanej z nim logiki konsensusu, a włączenie w to miejsce [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos). Sama aktualizacja Paris dotyczyła [klientów wykonawczych](/developers/docs/nodes-and-clients/#execution-clients) (odpowiednik Bellatrix w warstwie konsensusu) i umożliwiła im przyjmowanie instrukcji od połączonych z nimi [klientów konsensusu](/developers/docs/nodes-and-clients/#consensus-clients). Wymagało to aktywacji nowego zestawu wewnętrznych metod API, znanych zbiorczo jako [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Była to prawdopodobnie najbardziej znacząca aktualizacja w historii Ethereum od czasu [Homestead](#homestead)!

- [Przeczytaj specyfikację aktualizacji Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paryż" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Aktualizacja konsensusu do dowodu stawki (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Zastąpienie kodu operacji DIFFICULTY przez PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Podsumowanie {#bellatrix-summary}

Aktualizacja Bellatrix była drugą zaplanowaną aktualizacją dla [Beacon Chain](/roadmap/beacon-chain), przygotowującą łańcuch na [The Merge](/roadmap/merge/). Wprowadza ona pełne wartości kar dla walidatorów za brak aktywności oraz przewinienia podlegające cięciu. Bellatrix zawiera również aktualizację reguł wyboru rozwidlenia, aby przygotować łańcuch na The Merge oraz przejście z ostatniego bloku opartego na dowodzie pracy (PoW) do pierwszego bloku opartego na dowodzie stawki (PoS). Obejmuje to uświadomienie klientom konsensusu [końcowej całkowitej trudności](/glossary/#terminal-total-difficulty) wynoszącej 58750000000000000000000.

- [Przeczytaj specyfikację aktualizacji Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Podsumowanie {#gray-glacier-summary}

Aktualizacja sieci Gray Glacier opóźniła [bombę trudności](/glossary/#difficulty-bomb) o trzy miesiące. Jest to jedyna zmiana wprowadzona w tej aktualizacji i ma ona podobny charakter do aktualizacji [Arrow Glacier](#arrow-glacier) oraz [Muir Glacier](#muir-glacier). Podobne zmiany zostały przeprowadzone w aktualizacjach sieci [Bizancjum](#byzantium), [Konstantynopol](#constantinople) i [Londyn](#london).

- [Blog EF – Ogłoszenie aktualizacji Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP Gray Glacier" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>opóźnia bombę trudności do września 2022 r.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Podsumowanie {#arrow-glacier-summary}

Aktualizacja sieci Arrow Glacier opóźniła [bombę trudności](/glossary/#difficulty-bomb) o kilka miesięcy. Jest to jedyna zmiana wprowadzona w tej aktualizacji i ma ona podobny charakter do aktualizacji [Muir Glacier](#muir-glacier). Podobne zmiany zostały przeprowadzone w aktualizacjach sieci [Bizancjum](#byzantium), [Konstantynopol](#constantinople) oraz [London](#london).

- [Blog EF – Ogłoszenie aktualizacji Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders – Aktualizacja Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>opóźnia bombę trudności do czerwca 2022 r.</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Podsumowanie {#altair-summary}

Aktualizacja Altair była pierwszą zaplanowaną aktualizacją dla [Beacon Chain](/roadmap/beacon-chain). Dodała ona obsługę „komitetów synchronizacji” – umożliwiając działanie lekkich klientów, a także zwiększyła kary za nieaktywność walidatorów i cięcia w miarę postępów prac nad The Merge.

- [Przeczytaj specyfikację aktualizacji Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Ciekawostka! {#altair-fun-fact}

Altair był pierwszą dużą aktualizacją sieci, która miała dokładny czas wdrożenia. Każda wcześniejsza aktualizacja opierała się na zadeklarowanym numerze bloku w łańcuchu dowodu pracy (PoW), gdzie czasy bloków są zmienne. Beacon Chain nie wymaga rozwiązywania dowodu pracy, a zamiast tego działa w opartym na czasie systemie epok składającym się z 32 dwunastosekundowych „slotów”, w których walidatory mogą proponować bloki. Właśnie dlatego wiedzieliśmy dokładnie, kiedy osiągniemy epokę 74 240 i Altair zostanie uruchomiony!

- [Czas bloku](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Podsumowanie {#london-summary}

Aktualizacja London wprowadziła [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), który zreformował rynek opłat transakcyjnych, a także zmiany w sposobie obsługi zwrotów gazu i harmonogramie [epoki lodowcowej](/glossary/#ice-age).

#### Czym była aktualizacja London / EIP-1559? {#eip-1559}

Przed aktualizacją London, Ethereum miało bloki o stałym rozmiarze. W okresach wysokiego zapotrzebowania na sieć bloki te działały z pełną wydajnością. W rezultacie użytkownicy często musieli czekać na spadek popytu, aby zostać włączonym do bloku, co prowadziło do złych doświadczeń użytkowników. Aktualizacja London wprowadziła do Ethereum bloki o zmiennym rozmiarze.

Sposób obliczania opłat transakcyjnych w sieci Ethereum zmienił się wraz z [aktualizacją London](/ethereum-forks/#london) w sierpniu 2021 r. Przed aktualizacją London opłaty były obliczane bez rozdzielania opłat `base` i `priority`, w następujący sposób:

Załóżmy, że Alice musiała zapłacić Bobowi 1 ETH. W transakcji limit gazu wynosi 21 000 jednostek, a cena gazu to 200 gwei.

Całkowita opłata wyniosłaby: `Gas units (limit) * Gas price per unit` czyli `21,000 * 200 = 4,200,000 gwei` lub 0,0042 ETH

Wdrożenie [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) w aktualizacji London sprawiło, że mechanizm opłat transakcyjnych stał się bardziej złożony, ale opłaty za gaz stały się bardziej przewidywalne, co zaowocowało bardziej wydajnym rynkiem opłat transakcyjnych. Użytkownicy mogą przesyłać transakcje z `maxFeePerGas` odpowiadającym kwocie, jaką są skłonni zapłacić za wykonanie transakcji, wiedząc, że nie zapłacą więcej niż cena rynkowa za gaz (`baseFeePerGas`), a ewentualna nadwyżka, pomniejszona o opłatę priorytetową, zostanie im zwrócona.

Ten film wyjaśnia EIP-1559 i korzyści, jakie przynosi: [Wyjaśnienie EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Jesteś programistą zdecentralizowanych aplikacji (dapp)? Pamiętaj o aktualizacji swoich bibliotek i narzędzi.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Przeczytaj wyjaśnienie od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP Londyn" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>usprawnia rynek opłat transakcyjnych</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>zwraca <code>BASEFEE</code> z bloku</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> – <em>zmniejsza zwroty gazu za operacje EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> – <em>zapobiega wdrażaniu kontraktów zaczynających się od <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>opóźnia epokę lodowcową do grudnia 2021 r.</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Podsumowanie {#berlin-summary}

Aktualizacja Berlin zoptymalizowała koszt gazu dla niektórych akcji EVM i zwiększyła obsługę wielu typów transakcji.

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Przeczytaj wyjaśnienie od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Berlin" contentPreview="Oficjalne ulepszenia zawarte w tej aktualizacji.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>obniża koszt gazu dla ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>umożliwia łatwiejszą obsługę wielu typów transakcji</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>zwiększa koszt gazu dla kodów operacji dostępu do stanu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>dodaje opcjonalne listy dostępu</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneza Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Podsumowanie {#beacon-chain-genesis-summary}

[Beacon Chain](/roadmap/beacon-chain/) potrzebował 16384 depozytów po 32 stakowane ETH, aby bezpiecznie wystartować. Miało to miejsce 27 listopada, a Beacon Chain zaczął produkować bloki 1 grudnia 2020 r.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Beacon Chain
</DocLink>

---

### Wdrożenie kontraktu depozytu stakingowego {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Podsumowanie {#deposit-contract-summary}

Kontrakt depozytu stakingowego wprowadził [staking](/glossary/#staking) do ekosystemu Ethereum. Mimo że był to kontrakt [Sieci głównej](/glossary/#mainnet), miał bezpośredni wpływ na harmonogram uruchomienia [Beacon Chain](/roadmap/beacon-chain/), ważnej [aktualizacji Ethereum](/roadmap/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Podsumowanie {#muir-glacier-summary}

Fork Muir Glacier wprowadził opóźnienie [bomby trudności](/glossary/#difficulty-bomb). Wzrost trudności bloków w mechanizmie konsensusu [dowodu pracy (PoW)](/developers/docs/consensus-mechanisms/pow/) groził pogorszeniem użyteczności Ethereum poprzez wydłużenie czasu oczekiwania na wysyłanie transakcji i korzystanie ze zdecentralizowanych aplikacji (dapp).

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Przeczytaj wyjaśnienie od Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>opóźnia bombę trudności o kolejne 4 000 000 bloków, czyli o około 611 dni.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Stambuł {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Podsumowanie {#istanbul-summary}

Rozwidlenie Stambuł:

- Zoptymalizowano koszty [gazu](/glossary/#gas) dla niektórych działań w [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Poprawiono odporność na ataki typu denial-of-service.
- Zwiększono wydajność rozwiązań [skalowania warstwy 2](/developers/docs/scaling/#layer-2-scaling) opartych na SNARK i STARK.
- Umożliwiono interoperacyjność między Ethereum a Zcash.
- Pozwolono kontraktom na wprowadzanie bardziej kreatywnych funkcji.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP Stambuł" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>pozwala Ethereum na współpracę z walutami chroniącymi prywatność, takimi jak Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>tańsza kryptografia w celu poprawy kosztów [gazu](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>chroni Ethereum przed atakami typu replay poprzez dodanie [kodu operacji](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optymalizacja cen gazu dla kodów operacji w oparciu o zużycie.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>obniża koszt danych wywołania (CallData), aby umożliwić umieszczanie większej ilości danych w blokach – korzystne dla [skalowania warstwy 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>inne zmiany cen gazu dla kodów operacji.</em></li>
</ul>

</ExpandableCard>

---

### Konstantynopol {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Podsumowanie {#constantinople-summary}

Fork Constantinople:

- Zmniejszono nagrody za [kopanie](/developers/docs/consensus-mechanisms/pow/mining/) bloków z 3 do 2 ETH.
- Zapewniono, że blockchain nie zatrzyma się przed [wdrożeniem dowodu stawki (PoS)](#beacon-chain-genesis).
- Zoptymalizowano koszty [gazu](/glossary/#gas) dla niektórych działań w [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Dodano możliwość interakcji z adresami, które nie zostały jeszcze utworzone.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP Konstantynopol" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optymalizuje koszt niektórych działań onchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>pozwala na interakcję z adresami, które nie zostały jeszcze utworzone.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>wprowadza instrukcję <code>EXTCODEHASH</code> do pobierania hasha kodu innego kontraktu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>zapewnia, że blockchain nie zatrzyma się przed dowodem stawki (PoS) i zmniejsza nagrodę za blok z 3 do 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Podsumowanie {#byzantium-summary}

Fork Byzantium:

- Zmniejszył nagrody za [kopanie](/developers/docs/consensus-mechanisms/pow/mining/) bloków z 5 do 3 ETH.
- Opóźnił [bombę trudności](/glossary/#difficulty-bomb) o rok.
- Dodał możliwość wykonywania niezmieniających stanu wywołań do innych kontraktów.
- Dodał pewne metody kryptograficzne, aby umożliwić [skalowanie warstwy 2 (L2)](/developers/docs/scaling/#layer-2-scaling).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP Bizancjum" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>dodaje kod operacji <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>dodaje pole statusu do potwierdzeń transakcji, aby wskazać sukces lub porażkę.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>dodaje krzywą eliptyczną i mnożenie skalarne, aby umożliwić [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>dodaje krzywą eliptyczną i mnożenie skalarne, aby umożliwić [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>umożliwia weryfikację podpisów RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>dodaje obsługę wartości zwracanych o zmiennej długości.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>dodaje kod operacji <code>STATICCALL</code>, pozwalający na niezmieniające stanu wywołania do innych kontraktów.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>zmienia formułę dostosowywania trudności.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>opóźnia [bombę trudności](/glossary/#difficulty-bomb) o 1 rok i zmniejsza nagrodę za blok z 5 do 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Podsumowanie {#spurious-dragon-summary}

Rozwidlenie Spurious Dragon było drugą odpowiedzią na ataki typu odmowa usługi (DoS) na sieć (wrzesień/październik 2016 r.), obejmującą:

- dostosowanie cen kodów operacji, aby zapobiec przyszłym atakom na sieć.
- umożliwienie „odchudzenia” stanu blockchaina.
- dodanie ochrony przed atakami typu replay.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>zapobiega ponownemu rozgłaszaniu transakcji z jednego łańcucha Ethereum w alternatywnym łańcuchu, na przykład ponownemu odtworzeniu transakcji z sieci testowej w głównym łańcuchu Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>dostosowuje ceny kodu operacji <code>EXP</code> – utrudnia spowolnienie sieci poprzez kosztowne obliczeniowo operacje na kontraktach.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>pozwala na usunięcie pustych kont dodanych w wyniku ataków DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>zmienia maksymalny rozmiar kodu, jaki może mieć kontrakt na blockchainie – do 24576 bajtów.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Podsumowanie {#tangerine-whistle-summary}

Rozwidlenie Tangerine Whistle było pierwszą odpowiedzią na ataki typu odmowa usługi (DoS) na sieć (wrzesień/październik 2016 r.), obejmującą:

- rozwiązanie pilnych problemów ze stanem sieci dotyczących zbyt tanich kodów operacji.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>zwiększa koszty gazu dla kodów operacji, które mogą być użyte w atakach spamowych.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>zmniejsza rozmiar stanu poprzez usunięcie dużej liczby pustych kont, które zostały umieszczone w stanie bardzo niskim kosztem z powodu luk we wcześniejszych wersjach protokołu Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Rozwidlenie DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Podsumowanie {#dao-fork-summary}

Rozwidlenie DAO było odpowiedzią na [atak na DAO w 2016 roku](https://www.coindesk.com/learn/understanding-the-dao-attack/), w którym z niezabezpieczonego kontraktu [DAO](/glossary/#dao) wyprowadzono ponad 3,6 miliona ETH w wyniku włamania. Rozwidlenie przeniosło środki z wadliwego kontraktu do [nowego kontraktu](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) z jedną funkcją: withdraw (wypłata). Każdy, kto stracił środki, mógł wypłacić 1 ETH za każde 100 tokenów DAO w swoim portfelu.

Taki kierunek działań został poddany pod głosowanie społeczności Ethereum. Każdy posiadacz ETH mógł zagłosować za pomocą transakcji na [platformie do głosowania](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Decyzja o rozwidleniu uzyskała ponad 85% głosów.

Niektórzy górnicy odmówili przyjęcia rozwidlenia, ponieważ incydent z DAO nie był błędem w protokole. W rezultacie utworzyli oni [Ethereum Classic](https://ethereumclassic.org/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Podsumowanie {#homestead-summary}

Rozwidlenie Homestead patrzyło w przyszłość. Obejmowało ono kilka zmian w protokole oraz zmianę sieciową, która dała Ethereum możliwość przeprowadzania dalszych aktualizacji sieci.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP Homestead" contentPreview="Oficjalne ulepszenia zawarte w tym rozwidleniu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>wprowadza zmiany w procesie tworzenia kontraktów.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>dodaje nowy kod operacji: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>wprowadza wymagania dotyczące kompatybilności w przód dla devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Odwilż Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Podsumowanie {#frontier-thawing-summary}

Fork odwilży Frontier zniósł limit 5000 [gazu](/glossary/#gas) na [blok](/glossary/#block) i ustalił domyślną cenę gazu na 51 [gwei](/glossary/#gwei). Pozwoliło to na przeprowadzanie transakcji – transakcje wymagają 21 000 gazu. Wprowadzono [bombę trudności](/glossary/#difficulty-bomb), aby zapewnić przyszły hard fork na [dowód stawki (PoS)](/glossary/#pos).

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Przeczytaj aktualizację protokołu Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Podsumowanie {#frontier-summary}

Frontier był działającą, ale podstawową implementacją projektu Ethereum. Nastąpił po udanej fazie testowej Olympic. Był przeznaczony dla użytkowników technicznych, w szczególności programistów. [Bloki](/glossary/#block) miały limit [gazu](/glossary/#gas) wynoszący 5000. Ten okres „odwilży” pozwolił górnikom na rozpoczęcie działalności, a wczesnym użytkownikom na zainstalowanie klientów bez konieczności „pośpiechu”.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Sprzedaż etheru {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether oficjalnie trafił do sprzedaży na 42 dni. Można go było kupić za BTC.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Publikacja żółtej księgi {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Żółta księga, autorstwa dr. Gavina Wooda, jest techniczną definicją protokołu Ethereum.

[Zobacz żółtą księgę](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publikacja białej księgi {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Dokument wprowadzający, opublikowany w 2013 roku przez Vitalika Buterina, twórcę Ethereum, przed uruchomieniem projektu w 2015 roku.

<DocLink href="/whitepaper/">
  Biała księga
</DocLink>