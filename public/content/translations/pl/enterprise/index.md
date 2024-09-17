---
title: Przedsiębiorstwo w sieci głównej Ethereum
description: Przewodniki, artykuły i narzędzia dotyczące aplikacji korporacyjnych w publicznym blockchainie Ethereum
lang: pl
---

# Sieć główna Ethereum dla przedsiębiorstw {#ethereum-for-enterprise}

Aplikacje blockchain pomagają przedsiębiorstwom w następujących obszarach:

- Zwiększenie zaufania i obniżenie kosztów koordynacji pomiędzy stronami biznesowymi
- Poprawa odpowiedzialności sieci biznesowej i efektywności operacyjnej
- Budowanie nowych modeli biznesowych i możliwości tworzenia wartości
- Przyszłościowa konkurencyjność ich organizacji

Aplikacje korporacyjnego blockchainu można budować na publicznej [sieci głównej](/glossary/#mainnet) Ethereum lub na prywatnych blockchainach opartych na technologii Ethereum. Znajdź więcej informacji o [prywatnych sieciach Enterprise Ethereum](/enterprise/private-ethereum/).

## Ethereum publiczne vs prywatne {#private-vs-public}

Istnieje tylko jedna publiczna sieć główna Ethereum. Aplikacje zbudowane w sieci głównej mogą ze sobą współpracować, podobnie jak aplikacje zbudowane w Internecie mogą łączyć się ze sobą, wykorzystując pełny potencjał zdecentralizowanego blockchainu.

Wiele firm i konsorcjów wdrożyło prywatne, autoryzowane łańcuchy bloków dla określonych aplikacji opartych na technologii Ethereum.

### Kluczowe różnice {#key-differences}

- Bezpieczeństwo/niezmienność blockchainu — odporność blockchainu na manipulacje jest określana przez jego algorytm konsensusu. Sieć główna Ethereum jest zabezpieczona przez interakcję tysięcy niezależnych węzłów prowadzonych przez osoby fizyczne i górników na całym świecie. Łańcuchy prywatne zazwyczaj mają niewielką liczbę węzłów, które są kontrolowane przez jedną lub kilka organizacji; te węzły mogą być ściśle kontrolowane, ale przepisanie łańcucha lub dokonanie oszukańczych transakcji wymaga naruszenia tylko kilku z nich.
- Wydajność — ponieważ prywatne sieci Enterprise Ethereum mogą używać węzłów o wysokiej wydajności ze specjalnymi wymaganiami sprzętowymi i różnymi algorytmami konsensusu, takimi jak proof-of-authority, mogą osiągnąć wyższą przepustowość transakcji w warstwie podstawowej (Warstwa 1). W sieci głównej Ethereum wysoką przepustowość można osiągnąć przy użyciu [rozwiązań skalowania warstwy 2](/developers/docs/scaling/).
- Koszt — koszt obsługi sieci prywatnej odzwierciedla się przede wszystkim w pracy związanej z konfiguracją sieci i zarządzaniem nią oraz serwerami do jej obsługi. Chociaż połączenie z siecią główną Ethereum nie wiąże się z żadnymi kosztami, każda transakcja wiąże się z opłatą za gaz, za którą należy zapłacić Ethereum. Przekaźniki transakcyjne (znane również jako stacje gazu) są opracowywane w celu wyeliminowania potrzeby, aby użytkownicy końcowi, a nawet przedsiębiorstwa, bezpośrednio wykorzystywali Ether w swoich transakcjach. Niektóre [analizy](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) wykazały, że całkowity koszt obsługi aplikacji może być niższy w sieci głównej niż w przypadku uruchomienia prywatnego łancucha.
- Zezwalanie na węzły — tylko autoryzowane węzły mogą dołączać do łańcuchów prywatnych. Każdy może skonfigurować węzeł w sieci głównej Ethereum.
- Prywatność — dostęp do danych zapisanych w prywatnych łańcuchach można kontrolować, ograniczając dostęp do sieci, a także w bardziej szczegółowy sposób za pomocą kontroli dostępu i transakcji prywatnych. Wszystkie dane zapisane w warstwie 1 sieci mainnet są widoczne dla każdego, więc poufne informacje powinny być przechowywane i przesyłane poza łańcuchem lub szyfrowane. Pojawiają się wzorce projektowe, które to ułatwiają (np. Baseline, Aztec), a także rozwiązania warstwy 2, które mogą utrzymywać dane w podziale i poza warstwą 1.

### Dlaczego warto budować na sieci głównej Ethereum {#why-build-on-ethereum-mainnet}

Przedsiębiorstwa eksperymentują z technologią blockchain od około 2016 roku, kiedy uruchomiono projekty Hyperledger, Quorum i Corda. Skupiono się w dużej mierze na blockchainach przedsiębiorstw posiadających zezwolenie prywatne, Jednakże począwszy od 2019 r. nastąpiła zmiana w myśleniu o publicznych i prywatnych blockchainach dla aplikacji biznesowych. [Ankieta](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) przeprowadzona przez firmę Forrester ujawniła, że „respondenci ankiety… widzą ten potencjał, przy czym 75% deklaruje, że prawdopodobnie będą korzystać z publicznych blockchainów w przyszłości, a prawie jedna trzecia twierdzi, że jest to bardzo prawdopodobne”. Paul Brody z EY [rozmawiał](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) o korzyściach z budowania na publicznym blockchainie, które (w zależności od aplikacji) mogą obejmować silniejsze zabezpieczenia/niezmienność, przejrzystość, niższy całkowity koszt posiadania oraz możliwość współdziałania ze wszystkimi innymi aplikacjami, które również znajdują się w sieci głównej (efekty sieciowe). Dzielenie się wspólnymi punktami odniesienia między firmami pozwala uniknąć niepotrzebnego tworzenia wielu odizolowanych silosów, które nie mogą się komunikować i udostępniać lub synchronizować między sobą informacji.

Kolejnym osiągnięciem, które przenosi nacisk na publiczne blockchainy, jest [Warstwa 2](/developers/docs/scaling/). Warstwa 2 to przede wszystkim kategoria technologii skalowalności, która umożliwia stosowanie aplikacji o wysokiej przepustowości w publicznych łańcuchach. Ale rozwiązania warstwy 2 mogą również [ umożliwić uporanie się z innymi problemami, które w przeszłości skłoniły deweloperów przedsiębiorstw do wyboru sieci prywatnych](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Baseline Protocol to jeden z kluczowych projektów, który definiuje protokół umożliwiający poufną i złożoną współpracę między przedsiębiorstwami bez pozostawiania żadnych poufnych danych w łańcuchu. W ciągu 2020 r. nabrał istotnego [rozpędu](https://www.oasis-open.org/news/pr/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise-).

## Zasoby dla programistów korporacyjnych {#enterprise-developer-resources}

### Organizations {#organizations}

Różne organizacje podjęły pewne wspólne działania, aby uczynić Ethereum przyjaznym dla przedsiębiorstw:

- [Enterprise Ethereum Alliance (EOG)](https://entethalliance.org/) EOG umożliwia organizacjom przyjęcie i wykorzystanie technologii Ethereum w codziennej działalności biznesowej. Umożliwia ekosystemowi Ethereum rozwijanie nowych możliwości biznesowych, stymulowanie przyjęcia w branży oraz wzajemną naukę i współpracę. Grupa robocza głównej sieci EEA jest punktem centralnym dla przedstawicieli firm zainteresowanych budowaniem na publicznej sieci Ethereum, a także członków społeczności Ethereum, którzy chcieliby ich wspierać.
- [Otwarty projekt Ethereum OASIS](https://github.com/ethereum-oasis/oasis-open-project) Ethereum OASIS Open Project to otwarty projekt OASIS, który istnieje, aby zapewnić neutralne forum dla różnych interesariuszy do tworzenia wysokiej jakości specyfikacji, które ułatwiają długowieczność, interoperacyjność i łatwość integracji Ethereum. Projekt ma na celu opracowanie przejrzystych, otwartych standardów, wysokiej jakości dokumentacji i wspólnych zestawów testów, które ułatwią wprowadzanie nowych funkcji i ulepszeń protokołu Ethereum.
- [Projekt bazowy](https://www.baseline-protocol.org/) Baseline Protocol to inicjatywa open source, która łączy postępy w kryptografii, przesyłaniu wiadomości i blockchain w celu dostarczania bezpiecznych i prywatnych procesów biznesowych przy niskich kosztach za pośrednictwem publicznej sieci Ethereum. Protokół umożliwia poufną i złożoną współpracę między przedsiębiorstwami bez pozostawiania poufnych danych w łańcuchu. Projekt Baseline jest podprojektem Otwartego Projektu Ethereum OASIS i jest koordynowany przez Techniczny Komitet Sterujący Baseline.

### Produkty i usługi {#products-and-services}

- [Alchemia](https://alchemyapi.io/) _dostarcza usługi API i narzędzia do budowania i monitorowania aplikacji w Ethereum_
- [Blockapps](https://blockapps.net/) _implementation of the Enterprise Ethereum protocol, tooling and APIs that form the STRATO platform_
- [ConsenSys](https://consensys.io/) _zapewnia szereg produktów i narzędzi do budowania na Ethereum, a także doradztwo i niestandardowe usługi programistyczne _
- [Envision Blockchain](https://envisionblockchain.com/) _zapewnia usługi konsultingowe i programistyczne zorientowane na przedsiębiorstwa, specjalizujące się w sieciach głównych Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _zapewnia przepływ pracy poprzez wystawianie zapytań ofertowych, umów, zamówień zakupu i faktury w Twojej sieci zaufanych partnerów biznesowych_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _ukierunkowany na przedsiębiorstwa klient Ethereum typu open source opracowany na licencji Apache 2.0 i napisany w Javie_
- [Infura](https://infura.io/) _scalable API access to the Ethereum and IPFS networks_
- [Zapewnij](https://provide.services/) _infrastrukturę i interfejsy API dla aplikacji Enterprise Web3_
- [Unibright](https://unibright.io/) _zespół specjalistów, architektów, programistów i konsultantów blockchain z ponad 20-letnim doświadczeniem w procesach biznesowych i integracji_

### Narzędzia i biblioteki {#tooling-and-libraries}

- [Alethio](https://aleth.io/) _Ethereum Data Analytics Platform_
- [Epirus](https://www.web3labs.com/epirus) _platforma do tworzenia, wdrażania i monitorowania aplikacji blockchain przez Web3 Labs_
- [Ernst & „Nightfall” firmy Young](https://github.com/EYBlockchain/nightfall) _zestaw narzędzi do prywatnych transakcji_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _aplikacja do podpisywania transakcji do użytku z dostawcą web3_
- [Tenderly](https://tenderly.co/) _platforma danych zapewniająca analizy w czasie rzeczywistym, alerty i monitorowanie z obsługą sieci prywatnych._

### Rozwiązania skalowalne {#scalability-solutions}

[Warstwa 2](/developers/docs/scaling/) to zestaw technologii lub systemów, które działają na wierzchu Ethereum (Warstwa 1), dziedziczą właściwości zabezpieczeń z warstwy 1 i zapewniają większą wydajność przetwarzania transakcji (przepustowość), niższe opłaty transakcyjne (koszty operacyjne) i szybsze potwierdzenia transakcji niż warstwa 1. Rozwiązania skalowania warstwy 2 są zabezpieczone przez warstwę 1, ale umożliwiają aplikacjom łańcucha bloków obsługę znacznie większej liczby użytkowników, działań lub danych, niż może pomieścić warstwa 1. Wiele z nich wykorzystuje najnowsze postępy w kryptografii i dowody zerowej wiedzy (ZK), aby zmaksymalizować wydajność i bezpieczeństwo.

Zbudowanie aplikacji na bazie rozwiązania skalowalności warstwy 2 może pomóc [rozwiązuje wiele problemów, które wcześniej skłaniały firmy do budowania na prywatnych blockchainach](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), zachowując jednak korzyści płynące z budowania na sieci głównej.

Przykłady rozwiązań L2, które są gotowe do produkcji lub wkrótce będą:

- Optymistyczne pakiety zbiorcze (dane o łańcuchu, dowody oszustwa)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Sieć paliwowa](https://fuel.sh)
- Pakiety zbiorcze ZK (dane dotyczące łańcucha, dowody ważności ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (dane niezwiązane z łańcuchem, dowody ważności ZK)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plazma (dane poza łańcuchem, dowody oszustwa)
  - [Sieć OMG](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Sieć Matic](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Kanały uzyskiwania informacji
  - [Połącz](https://connext.network/)
  - [Raiden](https://raiden.network/)
  - [Perun](https://perun.network)
- Łańcuchy boczne
  - [Skale](https://skale.network)
  - [Sieć POA](https://www.poa.network/)
- Rozwiązania hybrydowe łączące właściwości wielu kategorii
  - [Celer](https://celer.network)

## Aplikacje korporacyjne działają w sieci głównej {#enterprise-live-on-mainnet}

Oto niektóre aplikacje dla przedsiębiorstw, które zostały wdrożone w publicznej sieci Ethereum

### Płatności {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _płaci użytkownikom za ich uwagę poświęconą reklamom, a użytkownicy mogą płacić wydawcom za ich wsparcie, za pośrednictwem podstawowego tokena uwagi._
- [hCaptcha](https://www.hcaptcha.com/) _System CAPTCHA zapobiegający botom, który płaci operatorom witryn za pracę wykonaną przez użytkowników w celu oznaczenia danych do uczenia maszynowego. Teraz wdrożone przez Cloudflare._
- [Audius](https://audius.co/) _usługa przesyłania strumieniowego, która łączy fanów muzyki bezpośrednio z wykonawcami i umożliwia artystom otrzymywanie pełnej zapłaty przez ich fanów, bezpośrednio i natychmiastowo dla każdego strumienia_

### Finanse {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _emisja i rozrachunek obligacji_
- [Societe Generale](https://www.societegenerale.com/en/newsroom-first-financial-transaction-settled-with-a-digital-currency) _emisja obligacji_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _oferta obligacji i tokenizacja dla marek FAT_
- [Sila](https://silamoney.com/) _infrastruktura bankowa i płatności ACH jako usługa_
- [Tinlake](https://tinlake.centrifuge.io/) _finansowanie należności za pomocą stokenizowanych aktywów rzeczywistych, takich jak faktury, hipoteki lub tantiemy strumieniowe_
- [Kratos](https://triterras.com/kratos) _platforma handlu towarami i finansowania handlu, która łączy i umożliwia handlowcom towarowym handel i pozyskiwanie kapitału od pożyczkodawców bezpośrednio online_
- [Fasset](https://www.fasset.com/) _platforma wspierająca zrównoważoną infrastrukturę_

### Notarialne poświadczenie danych {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _szczegóły sfinalizowanych pożyczek są zhaszowane i zarejestrowane w sieci głównej_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _największa włoska agencja informacyjna walcząca z fałszywymi wiadomościami i umożliwiająca odbiorcom weryfikację pochodzenia wiadomości poprzez rejestrowanie ich w sieci głównej_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _rejestruje informacje prasowe dotyczące Ethereum, aby zapewnić odpowiedzialność i zaufanie korporacyjne_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _rejestruje pochodzenie i historie napraw zegarków w Ethereum_

### Łańcuch dostaw {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _platforma automatyzacji łańcucha dostaw, która implementuje hybrydę prywatnych łańcuchów z danymi poświadczonymi notarialnie w sieci głównej Ethereum, i jest używany przez firmy takie jak kanadyjski dystrybutor żywności, ropy i gazu Federated Co-op Ltd. i argentyński dostawca karmy dla zwierząt Vitalcan_
- [Minespider](https://www.minespider.com/) _śledzenie łańcucha dostaw_
- [ShipChain](https://shipchain.io) _publiczny łańcuch boczny Ethereum i system korporacyjny zapewniający widoczność i zaufanie łańcucha dostaw, zwłaszcza w przypadku logistyki multimodalnej_
- [Follow Our Fibre](https://www.followourfibre.com) _monitorowanie łańcucha dostaw wiskozy_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _umożliwia firmom angażowanie się w proces zamówień poprzez wystawianie zapytań ofertowych, umowy, zamówienia i faktury w Twojej sieci zaufanych partnerów biznesowych_
- [Treum](https://treum.io/) _zapewnia przejrzystość, identyfikowalność i możliwość handlu w łańcuchach dostaw, wykorzystując technologię blockchain_

### Poświadczenia i certyfikaty {#credentials}

- [Hrabstwa Utah](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _wydawanie cyfrowych aktów małżeństwa w Ethereum_
- [Dwie włoskie szkoły średnie](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _dyplomy cyfrowe wydawane w sieci głównej Ethereum_
- [Uniwersytet St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _projekt pilotażowy weryfikacji stopni przez szwajcarską uczelnię_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _wszystkie certyfikaty edukacyjne zarejestrowane w sieci głównej przez [Hyland](https://www.learningmachine.com/)_
- [Pohang University of Science and Technology](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _południowokoreański uniwersytet wydaje swoim nowym absolwentom dyplomy przechowywane w technologii blockchain_
- [OpenCerts](https://opencerts.io/) _wydaje poświadczenia edukacji blockchain w Singapurze_
- [BlockCerts](https://www.blockcerts.org/) _organizacja opracowała otwarty standard danych uwierzytelniających blockchain_
- [SkillTree](http://skilltree.org/) _szkolenia umiejętności i certyfikaty online, które można skonfigurować z wyzwalaczami wygaśnięcia lub zależnościami od innych umiejętności_

### Narzędzia {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _płatności za energię elektryczną_

Jeśli chcesz dodać coś do tej listy, zapoznaj się z [instrukcjami dotyczącymi wkładu](/contributing/).
