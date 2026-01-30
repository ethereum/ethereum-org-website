---
title: Weryfikowanie inteligentnych kontraktów
description: Przegląd weryfikacji kodu źródłowego dla inteligentnych kontraktów Ethereum
lang: pl
---

[Inteligentne kontrakty](/developers/docs/smart-contracts/) są zaprojektowane jako „niewymagające zaufania”, co oznacza, że użytkownicy nie powinni musieć ufać stronom trzecim (np. deweloperom i firmom) przed interakcją z kontraktem. Jako warunek konieczny dla braku zaufania, użytkownicy i inni deweloperzy muszą mieć możliwość weryfikacji kodu źródłowego inteligentnego kontraktu. Weryfikacja kodu źródłowego zapewnia użytkowników i deweloperów, że opublikowany kod kontraktu jest tym samym kodem, który działa pod adresem kontraktu w łańcuchu bloków Ethereum.

Ważne jest, aby odróżnić „weryfikację kodu źródłowego” od „[formalnej weryfikacji](/developers/docs/smart-contracts/formal-verification/)”. Weryfikacja kodu źródłowego, która zostanie szczegółowo wyjaśniona poniżej, odnosi się do sprawdzenia, czy dany kod źródłowy inteligentnego kontraktu w języku wysokiego poziomu (np. Solidity) kompiluje się do tego samego kodu bajtowego, który ma być wykonany pod adresem kontraktu. Jednakże formalna weryfikacja opisuje weryfikację poprawności inteligentnego kontraktu, co oznacza, że kontrakt zachowuje się zgodnie z oczekiwaniami. Chociaż jest to zależne od kontekstu, weryfikacja kontraktu zwykle odnosi się do weryfikacji kodu źródłowego.

## Czym jest weryfikacja kodu źródłowego? {#what-is-source-code-verification}

Przed wdrożeniem inteligentnego kontraktu w [Wirtualnej Maszynie Ethereum (EVM)](/developers/docs/evm/) deweloperzy [kompilują](/developers/docs/smart-contracts/compiling/) kod źródłowy kontraktu — instrukcje [napisane w Solidity](/developers/docs/smart-contracts/languages/) lub innym języku programowania wysokiego poziomu — do kodu bajtowego. Ponieważ EVM nie może interpretować instrukcji wysokiego poziomu, kompilacja kodu źródłowego do kodu bajtowego (tj. instrukcji maszynowych niskiego poziomu) jest niezbędna do wykonania logiki kontraktu w EVM.

Weryfikacja kodu źródłowego polega na porównaniu kodu źródłowego inteligentnego kontraktu ze skompilowanym kodem bajtowym użytym podczas tworzenia kontraktu w celu wykrycia wszelkich różnic. Weryfikacja inteligentnych kontraktów jest ważna, ponieważ reklamowany kod kontraktu może różnić się od tego, co jest uruchamiane w łańcuchu bloków.

Weryfikacja inteligentnego kontraktu umożliwia zbadanie, co robi kontrakt poprzez język wyższego poziomu, w którym jest napisany, bez konieczności czytania kodu maszynowego. Funkcje, wartości i zazwyczaj nazwy zmiennych i komentarze pozostają takie same jak w oryginalnym kodzie źródłowym, który jest kompilowany i wdrażany. To znacznie ułatwia czytanie kodu. Weryfikacja źródła umożliwia również dokumentację kodu, dzięki czemu użytkownicy końcowi wiedzą, do czego przeznaczony jest inteligentny kontrakt.

### Czym jest pełna weryfikacja? {#full-verification}

Istnieją pewne części kodu źródłowego, które nie wpływają na skompilowany kod bajtowy, takie jak komentarze lub nazwy zmiennych. Oznacza to, że dwa kody źródłowe z różnymi nazwami zmiennych i różnymi komentarzami mogłyby zweryfikować ten sam kontrakt. W związku z tym złośliwy aktor może dodać zwodnicze komentarze lub nadać mylące nazwy zmiennych w kodzie źródłowym i uzyskać weryfikację kontraktu z kodem źródłowym innym niż oryginalny kod źródłowy.

Można tego uniknąć, dołączając dodatkowe dane do kodu bajtowego, aby służyły jako _gwarancja kryptograficzna_ dokładności kodu źródłowego oraz jako _odcisk palca_ informacji o kompilacji. Niezbędne informacje znajdują się w [metadanych kontraktu Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), a hasz tego pliku jest dołączany do kodu bajtowego kontraktu. Możesz zobaczyć, jak to działa na [placu zabaw metadanych](https://playground.sourcify.dev)

Plik metadanych zawiera informacje o kompilacji kontraktu, w tym pliki źródłowe i ich hasze. Oznacza to, że jeśli zmienią się jakiekolwiek ustawienia kompilacji lub nawet bajt w jednym z plików źródłowych, plik metadanych ulegnie zmianie. W konsekwencji hasz pliku metadanych, który jest dołączany do kodu bajtowego, również się zmienia. Oznacza to, że jeśli kod bajtowy kontraktu + dołączony hasz metadanych pasują do danego kodu źródłowego i ustawień kompilacji, możemy być pewni, że jest to dokładnie ten sam kod źródłowy, który został użyty w oryginalnej kompilacji, a żaden bajt nie jest inny.

Ten typ weryfikacji, który wykorzystuje hasz metadanych, jest określany jako **„[pełna weryfikacja](https://docs.sourcify.dev/docs/full-vs-partial-match/)”** (także „doskonała weryfikacja”). Jeśli hasze metadanych nie pasują lub nie są uwzględniane w weryfikacji, byłaby to „częściowa zgodność”, która jest obecnie bardziej powszechnym sposobem weryfikacji kontraktów. Możliwe jest [wstawienie złośliwego kodu](https://samczsun.com/hiding-in-plain-sight/), który nie zostałby odzwierciedlony w zweryfikowanym kodzie źródłowym bez pełnej weryfikacji. Większość deweloperów nie jest świadoma pełnej weryfikacji i nie przechowuje pliku metadanych swojej kompilacji, stąd częściowa weryfikacja jest jak dotąd de facto metodą weryfikacji kontraktów.

## Dlaczego weryfikacja kodu źródłowego jest ważna? {#importance-of-source-code-verification}

### Brak zaufania {#trustlessness}

Brak zaufania jest prawdopodobnie największą przesłanką dla inteligentnych kontraktów i [aplikacji zdecentralizowanych (dapki)](/developers/docs/dapps/). Inteligentne kontrakty są „niezmienne” i nie można ich zmieniać; kontrakt będzie wykonywał tylko logikę biznesową zdefiniowaną w kodzie w momencie wdrożenia. Oznacza to, że deweloperzy i przedsiębiorstwa nie mogą manipulować kodem kontraktu po wdrożeniu go w Ethereum.

Aby inteligentny kontrakt był niewymagający zaufania, kod kontraktu powinien być dostępny do niezależnej weryfikacji. Chociaż skompilowany kod bajtowy dla każdego inteligentnego kontraktu jest publicznie dostępny w łańcuchu bloków, język niskiego poziomu jest trudny do zrozumienia — zarówno dla deweloperów, jak i użytkowników.

Projekty zmniejszają założenia dotyczące zaufania, publikując kod źródłowy swoich kontraktów. Ale to prowadzi do innego problemu: trudno jest zweryfikować, czy opublikowany kod źródłowy pasuje do kodu bajtowego kontraktu. W tym scenariuszu wartość braku zaufania jest tracona, ponieważ użytkownicy muszą ufać deweloperom, że nie zmienią logiki biznesowej kontraktu (tj. zmieniając kod bajtowy) przed wdrożeniem go w łańcuchu bloków.

Narzędzia do weryfikacji kodu źródłowego zapewniają gwarancje, że pliki kodu źródłowego inteligentnego kontraktu pasują do kodu asemblera. Rezultatem jest ekosystem niewymagający zaufania, w którym użytkownicy nie ufają ślepo stronom trzecim, a zamiast tego weryfikują kod przed zdeponowaniem środków w kontrakcie.

### Bezpieczeństwo użytkownika {#user-safety}

W przypadku inteligentnych kontraktów w grę wchodzą zwykle duże pieniądze. Wymaga to wyższych gwarancji bezpieczeństwa i weryfikacji logiki inteligentnego kontraktu przed jego użyciem. Problem w tym, że pozbawieni skrupułów deweloperzy mogą oszukiwać użytkowników, wstawiając złośliwy kod do inteligentnego kontraktu. Bez weryfikacji złośliwe inteligentne kontrakty mogą mieć [backdoory](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), kontrowersyjne mechanizmy kontroli dostępu, możliwe do wykorzystania luki w zabezpieczeniach i inne rzeczy, które zagrażają bezpieczeństwu użytkowników i które pozostałyby niewykryte.

Publikowanie plików kodu źródłowego inteligentnego kontraktu ułatwia zainteresowanym, takim jak audytorzy, ocenę kontraktu pod kątem potencjalnych wektorów ataku. Gdy wiele stron niezależnie weryfikuje inteligentny kontrakt, użytkownicy mają silniejsze gwarancje jego bezpieczeństwa.

## Jak zweryfikować kod źródłowy dla inteligentnych kontraktów Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Wdrażanie inteligentnego kontraktu w Ethereum](/developers/docs/smart-contracts/deploying/) wymaga wysłania transakcji z ładunkiem danych (skompilowanym kodem bajtowym) na specjalny adres. Ładunek danych jest generowany przez skompilowanie kodu źródłowego, plus [argumenty konstruktora](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) instancji kontraktu dołączone do ładunku danych w transakcji. Kompilacja jest deterministyczna, co oznacza, że zawsze daje ten sam wynik (tj. kod bajtowy kontraktu), jeśli używane są te same pliki źródłowe i ustawienia kompilacji (np. wersja kompilatora, optymalizator).

![Diagram przedstawiający weryfikację kodu źródłowego inteligentnego kontraktu](./source-code-verification.png)

Weryfikacja inteligentnego kontraktu zasadniczo obejmuje następujące kroki:

1. Wprowadź pliki źródłowe i ustawienia kompilacji do kompilatora.

2. Kompilator wyprowadza kod bajtowy kontraktu

3. Pobierz kod bajtowy wdrożonego kontraktu pod danym adresem

4. Porównaj wdrożony kod bajtowy z ponownie skompilowanym kodem bajtowym. Jeśli kody pasują, kontrakt zostaje zweryfikowany z podanym kodem źródłowym i ustawieniami kompilacji.

5. Dodatkowo, jeśli hasze metadanych na końcu kodu bajtowego pasują, będzie to pełna zgodność.

Należy pamiętać, że jest to uproszczony opis weryfikacji i istnieje wiele wyjątków, które nie będą z tym działać, takie jak posiadanie [niezmiennych zmiennych](https://docs.sourcify.dev/docs/immutables/).

## Narzędzia do weryfikacji kodu źródłowego {#source-code-verification-tools}

Tradycyjny proces weryfikacji kontraktów może być złożony. Dlatego mamy narzędzia do weryfikacji kodu źródłowego dla inteligentnych kontraktów wdrożonych na Ethereum. Narzędzia te automatyzują dużą część weryfikacji kodu źródłowego, a także przechowują zweryfikowane kontrakty dla korzyści użytkowników.

### Etherscan {#etherscan}

Chociaż Etherscan jest znany głównie jako [eksplorator łańcucha bloków Ethereum](/developers/docs/data-and-analytics/block-explorers/), oferuje również [usługę weryfikacji kodu źródłowego](https://etherscan.io/verifyContract) dla deweloperów i użytkowników inteligentnych kontraktów.

Etherscan umożliwia ponowne skompilowanie kodu bajtowego kontraktu z oryginalnego ładunku danych (kod źródłowy, adres biblioteki, ustawienia kompilatora, adres kontraktu itp.) Jeśli ponownie skompilowany kod bajtowy jest powiązany z kodem bajtowym (i parametrami konstruktora) kontraktu w łańcuchu, wówczas [kontrakt jest weryfikowany](https://info.etherscan.com/types-of-contract-verification/).

Po weryfikacji kod źródłowy Twojego kontraktu otrzymuje etykietę „Zweryfikowany” i jest publikowany na Etherscan, aby inni mogli go poddać audytowi. Dodawany jest również do sekcji [Zweryfikowane kontrakty](https://etherscan.io/contractsVerified/) — repozytorium inteligentnych kontraktów ze zweryfikowanymi kodami źródłowymi.

Etherscan jest najczęściej używanym narzędziem do weryfikacji kontraktów. Jednak weryfikacja kontraktu w Etherscan ma wadę: nie udaje się porównać **haszu metadanych** kodu bajtowego w łańcuchu i ponownie skompilowanego kodu bajtowego. Dlatego dopasowania w Etherscan są dopasowaniami częściowymi.

[Więcej o weryfikacji kontraktów w Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) to eksplorator blockchain o otwartym kodzie źródłowym, który zapewnia również [usługę weryfikacji kontraktów](https://eth.blockscout.com/contract-verification) dla deweloperów i użytkowników inteligentnych kontraktów. Jako alternatywa o otwartym kodzie źródłowym, Blockscout oferuje przejrzystość w sposobie przeprowadzania weryfikacji i umożliwia wkład społeczności w ulepszanie procesu weryfikacji.

Podobnie jak w przypadku innych usług weryfikacyjnych, Blockscout pozwala zweryfikować kod źródłowy kontraktu poprzez ponowne skompilowanie kodu bajtowego i porównanie go z wdrożonym kontraktem. Po weryfikacji kontrakt otrzymuje status weryfikacji, a kod źródłowy staje się publicznie dostępny do audytu i interakcji. Zweryfikowane kontrakty są również wymienione w [repozytorium zweryfikowanych kontraktów](https://eth.blockscout.com/verified-contracts) Blockscout w celu łatwego przeglądania i odkrywania.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) to kolejne narzędzie do weryfikacji kontraktów, które jest open-source i zdecentralizowane. Nie jest to eksplorator bloków i weryfikuje tylko kontrakty w [różnych sieciach opartych na EVM](https://docs.sourcify.dev/docs/chains). Działa jako publiczna infrastruktura dla innych narzędzi do budowania na niej i ma na celu umożliwienie bardziej przyjaznych dla człowieka interakcji z kontraktami za pomocą komentarzy [ABI](/developers/docs/smart-contracts/compiling/#web-applications) i [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) znalezionych w pliku metadanych.

W przeciwieństwie do Etherscan, Sourcify obsługuje pełne dopasowania z haszem metadanych. Zweryfikowane kontrakty są udostępniane w [publicznym repozytorium](https://docs.sourcify.dev/docs/repository/) na HTTP i [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), które jest zdecentralizowaną pamięcią [adresowaną treścią](https://docs.storacha.network/concepts/content-addressing/). Pozwala to na pobranie pliku metadanych kontraktu przez IPFS, ponieważ dołączony hasz metadanych jest haszem IPFS.

Dodatkowo, można również pobrać pliki kodu źródłowego przez IPFS, ponieważ hasze IPFS tych plików również znajdują się w metadanych. Kontrakt można zweryfikować, dostarczając plik metadanych i pliki źródłowe za pośrednictwem jego API lub [interfejsu użytkownika](https://sourcify.dev/#/verifier) lub za pomocą wtyczek. Narzędzie monitorujące Sourcify nasłuchuje również tworzenia kontraktów w nowych blokach i próbuje zweryfikować kontrakty, jeśli ich metadane i pliki źródłowe są opublikowane w IPFS.

[Więcej na temat weryfikacji kontraktów w Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platforma Tenderly](https://tenderly.co/) umożliwia deweloperom Web3 tworzenie, testowanie, monitorowanie i obsługę inteligentnych kontraktów. Łącząc narzędzia do debugowania z obserwowalnością i elementami składowymi infrastruktury, Tenderly pomaga deweloperom przyspieszyć rozwój inteligentnych kontraktów. Aby w pełni włączyć funkcje Tenderly, deweloperzy muszą [przeprowadzić weryfikację kodu źródłowego](https://docs.tenderly.co/monitoring/contract-verification) przy użyciu kilku metod.

Możliwe jest zweryfikowanie kontraktu prywatnie lub publicznie. Jeśli kontrakt zostanie zweryfikowany prywatnie, inteligentny kontrakt będzie widoczny tylko dla Ciebie (i innych członków Twojego projektu). Publiczna weryfikacja kontraktu sprawia, że jest on widoczny dla wszystkich korzystających z platformy Tenderly.

Możesz weryfikować swoje kontrakty za pomocą [pulpitu nawigacyjnego](https://docs.tenderly.co/contract-verification), [wtyczki Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat) lub [interfejsu wiersza poleceń (CLI)](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Podczas weryfikacji kontraktów za pomocą pulpitu nawigacyjnego należy zaimportować plik źródłowy lub plik metadanych wygenerowany przez kompilator Solidity, adres/sieć i ustawienia kompilatora.

Korzystanie z wtyczki Tenderly Hardhat pozwala na większą kontrolę nad procesem weryfikacji przy mniejszym wysiłku, umożliwiając wybór między automatyczną (bez kodu) a ręczną (opartą na kodzie) weryfikacją.

## Dalsza lektura {#further-reading}

- [Weryfikacja kodu źródłowego kontraktu](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
