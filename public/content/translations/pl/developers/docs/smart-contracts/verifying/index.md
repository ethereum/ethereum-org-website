---
title: "Weryfikacja inteligentnych kontraktów"
description: "Przegląd weryfikacji kodu źródłowego dla inteligentnych kontraktów Ethereum"
lang: pl
---

[Inteligentne kontrakty](/developers/docs/smart-contracts/) są zaprojektowane jako „niewymagające zaufania” (trustless), co oznacza, że użytkownicy nie powinni musieć ufać stronom trzecim (np. deweloperom i firmom) przed wejściem w interakcję z kontraktem. Jako warunek konieczny dla bezzaufaniowości, użytkownicy i inni deweloperzy muszą mieć możliwość weryfikacji kodu źródłowego inteligentnego kontraktu. Weryfikacja kodu źródłowego zapewnia użytkowników i deweloperów, że opublikowany kod kontraktu jest tym samym kodem, który działa pod adresem kontraktu na blockchainie Ethereum.

Ważne jest, aby rozróżnić „weryfikację kodu źródłowego” od „[weryfikacji formalnej](/developers/docs/smart-contracts/formal-verification/)”. Weryfikacja kodu źródłowego, która zostanie szczegółowo wyjaśniona poniżej, odnosi się do sprawdzenia, czy dany kod źródłowy inteligentnego kontraktu w języku wysokiego poziomu (np. Solidity) kompiluje się do tego samego kodu bajtowego, który ma zostać wykonany pod adresem kontraktu. Z kolei weryfikacja formalna opisuje sprawdzanie poprawności inteligentnego kontraktu, co oznacza, że kontrakt zachowuje się zgodnie z oczekiwaniami. Choć zależy to od kontekstu, weryfikacja kontraktu zazwyczaj odnosi się do weryfikacji kodu źródłowego.

## Czym jest weryfikacja kodu źródłowego? {#what-is-source-code-verification}

Przed wdrożeniem inteligentnego kontraktu w [Maszynie Wirtualnej Ethereum (EVM)](/developers/docs/evm/), deweloperzy [kompilują](/developers/docs/smart-contracts/compiling/) kod źródłowy kontraktu — instrukcje [napisane w Solidity](/developers/docs/smart-contracts/languages/) lub innym języku programowania wysokiego poziomu — do kodu bajtowego. Ponieważ EVM nie potrafi interpretować instrukcji wysokiego poziomu, kompilacja kodu źródłowego do kodu bajtowego (tj. instrukcji maszynowych niskiego poziomu) jest niezbędna do wykonania logiki kontraktu w EVM.

Weryfikacja kodu źródłowego polega na porównaniu kodu źródłowego inteligentnego kontraktu ze skompilowanym kodem bajtowym użytym podczas tworzenia kontraktu w celu wykrycia ewentualnych różnic. Weryfikacja inteligentnych kontraktów ma znaczenie, ponieważ reklamowany kod kontraktu może różnić się od tego, co faktycznie działa na blockchainie.

Weryfikacja inteligentnego kontraktu umożliwia zbadanie, co robi kontrakt, poprzez język wyższego poziomu, w którym został napisany, bez konieczności czytania kodu maszynowego. Funkcje, wartości, a zazwyczaj także nazwy zmiennych i komentarze pozostają takie same jak w oryginalnym kodzie źródłowym, który jest kompilowany i wdrażany. Znacznie ułatwia to czytanie kodu. Weryfikacja źródła zapewnia również dokumentację kodu, dzięki czemu użytkownicy końcowi wiedzą, do czego dany inteligentny kontrakt został zaprojektowany.

### Czym jest pełna weryfikacja? {#full-verification}

Istnieją pewne części kodu źródłowego, które nie wpływają na skompilowany kod bajtowy, takie jak komentarze czy nazwy zmiennych. Oznacza to, że dwa kody źródłowe z różnymi nazwami zmiennych i różnymi komentarzami mogłyby zweryfikować ten sam kontrakt. Dzięki temu złośliwy aktor może dodać mylące komentarze lub nadać wprowadzające w błąd nazwy zmiennych w kodzie źródłowym i zweryfikować kontrakt za pomocą kodu źródłowego różniącego się od oryginalnego.

Można tego uniknąć, dołączając do kodu bajtowego dodatkowe dane, które służą jako _kryptograficzna gwarancja_ dokładności kodu źródłowego oraz jako _odcisk palca_ informacji o kompilacji. Niezbędne informacje znajdują się w [metadanych kontraktu Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), a hash tego pliku jest dołączany do kodu bajtowego kontraktu. Możesz zobaczyć, jak to działa w [środowisku testowym metadanych](https://playground.sourcify.dev)

Plik metadanych zawiera informacje o kompilacji kontraktu, w tym pliki źródłowe i ich hashe. Oznacza to, że jeśli zmienią się jakiekolwiek ustawienia kompilacji lub nawet jeden bajt w jednym z plików źródłowych, plik metadanych ulegnie zmianie. W konsekwencji zmienia się również hash pliku metadanych, który jest dołączany do kodu bajtowego. Oznacza to, że jeśli kod bajtowy kontraktu + dołączony hash metadanych pasują do danego kodu źródłowego i ustawień kompilacji, możemy być pewni, że jest to dokładnie ten sam kod źródłowy użyty w oryginalnej kompilacji, i nie różni się on nawet o jeden bajt.

Ten rodzaj weryfikacji, który wykorzystuje hash metadanych, jest określany jako **„[pełna weryfikacja](https://docs.sourcify.dev/docs/full-vs-partial-match/)”** (również „weryfikacja idealna”). Jeśli hashe metadanych nie pasują do siebie lub nie są brane pod uwagę podczas weryfikacji, byłoby to „częściowe dopasowanie”, co obecnie jest bardziej powszechnym sposobem weryfikacji kontraktów. Możliwe jest [wstawienie złośliwego kodu](https://samczsun.com/hiding-in-plain-sight/), który nie znalazłby odzwierciedlenia w zweryfikowanym kodzie źródłowym bez pełnej weryfikacji. Większość deweloperów nie jest świadoma pełnej weryfikacji i nie przechowuje pliku metadanych swojej kompilacji, dlatego częściowa weryfikacja była dotychczas de facto standardową metodą weryfikacji kontraktów.

## Dlaczego weryfikacja kodu źródłowego jest ważna? {#importance-of-source-code-verification}

### Bezzaufaniowość {#trustlessness}

Bezzaufaniowość jest prawdopodobnie największym założeniem dla inteligentnych kontraktów i [zdecentralizowanych aplikacji (dapp)](/developers/docs/dapps/). Inteligentne kontrakty są „niezmienne” i nie można ich modyfikować; kontrakt wykona tylko logikę biznesową zdefiniowaną w kodzie w momencie wdrożenia. Oznacza to, że deweloperzy i przedsiębiorstwa nie mogą manipulować kodem kontraktu po jego wdrożeniu na Ethereum.

Aby inteligentny kontrakt był niewymagający zaufania, kod kontraktu powinien być dostępny do niezależnej weryfikacji. Chociaż skompilowany kod bajtowy dla każdego inteligentnego kontraktu jest publicznie dostępny na blockchainie, język niskiego poziomu jest trudny do zrozumienia — zarówno dla deweloperów, jak i użytkowników.

Projekty zmniejszają założenia dotyczące zaufania, publikując kod źródłowy swoich kontraktów. Prowadzi to jednak do kolejnego problemu: trudno jest zweryfikować, czy opublikowany kod źródłowy pasuje do kodu bajtowego kontraktu. W tym scenariuszu wartość bezzaufaniowości zostaje utracona, ponieważ użytkownicy muszą ufać deweloperom, że nie zmienią logiki biznesowej kontraktu (tj. poprzez zmianę kodu bajtowego) przed wdrożeniem go na blockchainie.

Narzędzia do weryfikacji kodu źródłowego dają gwarancję, że pliki kodu źródłowego inteligentnego kontraktu pasują do kodu asemblera. Rezultatem jest niewymagający zaufania ekosystem, w którym użytkownicy nie ufają ślepo stronom trzecim, a zamiast tego weryfikują kod przed zdeponowaniem środków w kontrakcie.

### Bezpieczeństwo użytkowników {#user-safety}

W przypadku inteligentnych kontraktów zazwyczaj w grę wchodzi duża stawka. Wymaga to wyższych gwarancji bezpieczeństwa i weryfikacji logiki inteligentnego kontraktu przed jego użyciem. Problem polega na tym, że pozbawieni skrupułów deweloperzy mogą oszukiwać użytkowników, wstawiając złośliwy kod do inteligentnego kontraktu. Bez weryfikacji złośliwe inteligentne kontrakty mogą mieć [backdoory](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), kontrowersyjne mechanizmy kontroli dostępu, możliwe do wykorzystania luki w zabezpieczeniach i inne rzeczy zagrażające bezpieczeństwu użytkowników, które pozostałyby niewykryte.

Publikacja plików kodu źródłowego inteligentnego kontraktu ułatwia zainteresowanym, takim jak audytorzy, ocenę kontraktu pod kątem potencjalnych wektorów ataku. Dzięki temu, że wiele stron niezależnie weryfikuje inteligentny kontrakt, użytkownicy mają silniejsze gwarancje jego bezpieczeństwa.

## Jak zweryfikować kod źródłowy dla inteligentnych kontraktów Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Wdrożenie inteligentnego kontraktu na Ethereum](/developers/docs/smart-contracts/deploying/) wymaga wysłania transakcji z ładunkiem danych (skompilowanym kodem bajtowym) na specjalny adres. Ładunek danych jest generowany poprzez kompilację kodu źródłowego, a do ładunku danych w transakcji dołączane są [argumenty konstruktora](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) instancji kontraktu. Kompilacja jest deterministyczna, co oznacza, że zawsze generuje ten sam wynik (tj. kod bajtowy kontraktu), jeśli użyte zostaną te same pliki źródłowe i ustawienia kompilacji (np. wersja kompilatora, optymalizator).

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

Weryfikacja inteligentnego kontraktu zasadniczo obejmuje następujące kroki:

1. Wprowadzenie plików źródłowych i ustawień kompilacji do kompilatora.

2. Kompilator generuje kod bajtowy kontraktu.

3. Pobranie kodu bajtowego wdrożonego kontraktu pod danym adresem.

4. Porównanie wdrożonego kodu bajtowego z ponownie skompilowanym kodem bajtowym. Jeśli kody są zgodne, kontrakt zostaje zweryfikowany z podanym kodem źródłowym i ustawieniami kompilacji.

5. Dodatkowo, jeśli hashe metadanych na końcu kodu bajtowego są zgodne, będzie to pełne dopasowanie.

Należy pamiętać, że jest to uproszczony opis weryfikacji i istnieje wiele wyjątków, które by z tym nie zadziałały, takich jak posiadanie [niezmiennych zmiennych](https://docs.sourcify.dev/docs/immutables/).

## Narzędzia do weryfikacji kodu źródłowego {#source-code-verification-tools}

Tradycyjny proces weryfikacji kontraktów może być skomplikowany. Właśnie dlatego dysponujemy narzędziami do weryfikacji kodu źródłowego dla inteligentnych kontraktów wdrożonych na Ethereum. Narzędzia te automatyzują dużą część weryfikacji kodu źródłowego, a także gromadzą zweryfikowane kontrakty z korzyścią dla użytkowników.

### Etherscan {#etherscan}

Chociaż Etherscan jest znany głównie jako [eksplorator bloków Ethereum](/developers/docs/data-and-analytics/block-explorers/), oferuje również [usługę weryfikacji kodu źródłowego](https://etherscan.io/verifyContract) dla deweloperów i użytkowników inteligentnych kontraktów.

Etherscan pozwala na ponowną kompilację kodu bajtowego kontraktu z oryginalnego ładunku danych (kod źródłowy, adres biblioteki, ustawienia kompilatora, adres kontraktu itp.). Jeśli ponownie skompilowany kod bajtowy jest powiązany z kodem bajtowym (i parametrami konstruktora) kontraktu onchain, to [kontrakt jest zweryfikowany](https://info.etherscan.com/types-of-contract-verification/).

Po weryfikacji kod źródłowy Twojego kontraktu otrzymuje etykietę „Verified” (Zweryfikowany) i jest publikowany na Etherscan, aby inni mogli go poddać audytowi. Zostaje on również dodany do sekcji [Verified Contracts](https://etherscan.io/contractsVerified/) — repozytorium inteligentnych kontraktów ze zweryfikowanymi kodami źródłowymi.

Etherscan jest najczęściej używanym narzędziem do weryfikacji kontraktów. Jednak weryfikacja kontraktów w Etherscan ma pewną wadę: nie porównuje **hasha metadanych** kodu bajtowego onchain i ponownie skompilowanego kodu bajtowego. Dlatego dopasowania w Etherscan są dopasowaniami częściowymi.

[Więcej o weryfikacji kontraktów na Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) to eksplorator bloków o otwartym kodzie źródłowym, który zapewnia również [usługę weryfikacji kontraktów](https://eth.blockscout.com/contract-verification) dla deweloperów i użytkowników inteligentnych kontraktów. Jako alternatywa open-source, Blockscout oferuje przejrzystość w sposobie przeprowadzania weryfikacji i umożliwia społeczności wnoszenie wkładu w ulepszanie procesu weryfikacji.

Podobnie jak inne usługi weryfikacji, Blockscout pozwala na weryfikację kodu źródłowego kontraktu poprzez ponowną kompilację kodu bajtowego i porównanie go z wdrożonym kontraktem. Po weryfikacji kontrakt otrzymuje status weryfikacji, a kod źródłowy staje się publicznie dostępny do audytu i interakcji. Zweryfikowane kontrakty są również wymienione w [repozytorium zweryfikowanych kontraktów](https://eth.blockscout.com/verified-contracts) Blockscout w celu łatwego przeglądania i odkrywania.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) to kolejne narzędzie do weryfikacji kontraktów, które jest zdecentralizowane i ma otwarty kod źródłowy. Nie jest to eksplorator bloków i weryfikuje jedynie kontrakty w [różnych sieciach opartych na EVM](https://docs.sourcify.dev/docs/chains). Działa jako publiczna infrastruktura, na której mogą opierać się inne narzędzia, a jego celem jest umożliwienie bardziej przyjaznych dla człowieka interakcji z kontraktami przy użyciu [ABI](/developers/docs/smart-contracts/compiling/#web-applications) i komentarzy [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) znajdującychcych się w pliku metadanych.

W przeciwieństwie do Etherscan, Sourcify obsługuje pełne dopasowania z hashem metadanych. Zweryfikowane kontrakty są udostępniane w jego [publicznym repozytorium](https://docs.sourcify.dev/docs/repository/) przez HTTP i [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), który jest zdecentralizowanym magazynem [adresowanym po treści](https://docs.storacha.network/concepts/content-addressing/). Pozwala to na pobranie pliku metadanych kontraktu przez IPFS, ponieważ dołączony hash metadanych jest hashem IPFS.

Dodatkowo można również pobrać pliki kodu źródłowego przez IPFS, ponieważ hashe IPFS tych plików znajdują się również w metadanych. Kontrakt można zweryfikować, dostarczając plik metadanych i pliki źródłowe przez jego API lub [interfejs użytkownika (UI)](https://sourcify.dev/#/verifier), albo korzystając z wtyczek. Narzędzie monitorujące Sourcify nasłuchuje również tworzenia kontraktów w nowych blokach i próbuje zweryfikować kontrakty, jeśli ich metadane i pliki źródłowe są opublikowane w IPFS.

[Więcej o weryfikacji kontraktów na Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Platforma Tenderly](https://tenderly.co/) umożliwia deweloperom Web3 budowanie, testowanie, monitorowanie i obsługę inteligentnych kontraktów. Łącząc narzędzia do debugowania z obserwowalnością i blokami konstrukcyjnymi infrastruktury, Tenderly pomaga deweloperom przyspieszyć rozwój inteligentnych kontraktów. Aby w pełni włączyć funkcje Tenderly, deweloperzy muszą [przeprowadzić weryfikację kodu źródłowego](https://docs.tenderly.co/monitoring/contract-verification) przy użyciu kilku metod.

Możliwe jest zweryfikowanie kontraktu prywatnie lub publicznie. W przypadku weryfikacji prywatnej inteligentny kontrakt jest widoczny tylko dla Ciebie (i innych członków Twojego projektu). Publiczna weryfikacja kontraktu sprawia, że jest on widoczny dla wszystkich korzystających z platformy Tenderly.

Możesz zweryfikować swoje kontrakty za pomocą [Pulpitu nawigacyjnego (Dashboard)](https://docs.tenderly.co/contract-verification), [wtyczki Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat) lub [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Podczas weryfikacji kontraktów za pośrednictwem Pulpitu nawigacyjnego należy zaimportować plik źródłowy lub plik metadanych wygenerowany przez kompilator Solidity, adres/sieć oraz ustawienia kompilatora.

Korzystanie z wtyczki Tenderly Hardhat pozwala na większą kontrolę nad procesem weryfikacji przy mniejszym wysiłku, umożliwiając wybór między weryfikacją automatyczną (bez kodu) a ręczną (opartą na kodzie).

## Dalsza lektura {#further-reading}

- [Weryfikacja kodu źródłowego kontraktu](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)