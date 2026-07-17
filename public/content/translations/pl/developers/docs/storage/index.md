---
title: Zdecentralizowane przechowywanie danych
description: "Przegląd tego, czym jest zdecentralizowane przechowywanie danych i dostępnych narzędzi do zintegrowania go ze zdecentralizowaną aplikacją (dapp)."
lang: pl
authors: ["Patrick Collins"]
---

W przeciwieństwie do scentralizowanego serwera obsługiwanego przez jedną firmę lub organizację, zdecentralizowane systemy przechowywania danych składają się z sieci peer-to-peer użytkowników-operatorów, którzy przechowują część wszystkich danych, tworząc odporny system udostępniania i przechowywania plików. Mogą one znajdować się w aplikacji opartej na technologii blockchain lub dowolnej sieci opartej na architekturze peer-to-peer.

Samo Ethereum może być używane jako zdecentralizowany system przechowywania danych i tak właśnie jest w przypadku przechowywania kodu we wszystkich inteligentnych kontraktach. Jednak jeśli chodzi o duże ilości danych, Ethereum nie zostało do tego zaprojektowane. Łańcuch stale rośnie, ale w momencie pisania tego tekstu łańcuch Ethereum ma około 500 GB - 1 TB ([w zależności od klienta](https://etherscan.io/chartsync/chaindefault)), a każdy węzeł w sieci musi być w stanie przechowywać wszystkie dane. Gdyby łańcuch miał się rozrosnąć do ogromnych ilości danych (powiedzmy 5 TB), dalsze działanie wszystkich węzłów nie byłoby wykonalne. Ponadto koszt wdrożenia tak dużej ilości danych w Sieci głównej byłby zaporowo wysoki ze względu na opłaty za [gaz](/developers/docs/gas).

Ze względu na te ograniczenia potrzebujemy innego łańcucha lub metodologii, aby przechowywać duże ilości danych w sposób zdecentralizowany.

Rozważając opcje zdecentralizowanego przechowywania danych (dStorage), użytkownik musi pamiętać o kilku rzeczach.

- Mechanizm trwałości / struktura zachęt
- Egzekwowanie retencji danych
- Decentralizacja
- Konsensus

## Mechanizm trwałości / struktura zachęt {#persistence-mechanism}

### Oparte na technologii blockchain {#blockchain-based}

Aby dany fragment danych przetrwał na zawsze, musimy użyć mechanizmu trwałości. Na przykład w Ethereum mechanizm trwałości polega na tym, że podczas uruchamiania węzła należy uwzględnić cały łańcuch. Nowe fragmenty danych są dołączane na końcu łańcucha, a on sam stale rośnie – co wymaga od każdego węzła replikacji wszystkich osadzonych danych.

Jest to znane jako trwałość **oparta na technologii blockchain**.

Problemem z trwałością opartą na technologii blockchain jest to, że łańcuch może stać się zbyt duży, aby w sposób wykonalny utrzymać i przechowywać wszystkie dane (np. [wiele źródeł](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) szacuje, że Internet wymaga ponad 40 zettabajtów pojemności pamięci masowej).

Blockchain musi również posiadać pewien rodzaj struktury zachęt. W przypadku trwałości opartej na technologii blockchain dokonywana jest płatność na rzecz walidatora. Kiedy dane są dodawane do łańcucha, walidatorzy otrzymują wynagrodzenie za ich dodanie.

Platformy z trwałością opartą na technologii blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Oparte na kontraktach {#contract-based}

Trwałość **oparta na kontraktach** opiera się na założeniu, że dane nie mogą być replikowane przez każdy węzeł i przechowywane w nieskończoność, a zamiast tego muszą być utrzymywane za pomocą umów w formie kontraktów. Są to umowy zawarte z wieloma węzłami, które obiecały przechowywać fragment danych przez określony czas. Muszą one być odnawiane lub opłacane ponownie za każdym razem, gdy wygasną, aby utrzymać trwałość danych.

W większości przypadków, zamiast przechowywać wszystkie dane onchain, przechowywany jest hash wskazujący, gdzie dane znajdują się w łańcuchu. W ten sposób cały łańcuch nie musi się skalować, aby pomieścić wszystkie dane.

Platformy z trwałością opartą na kontraktach:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Dodatkowe kwestie {#additional-consideration}

IPFS to rozproszony system do przechowywania i uzyskiwania dostępu do plików, stron internetowych, aplikacji i danych. Nie ma wbudowanego schematu zachęt, ale może być używany z dowolnym z powyższych rozwiązań opartych na kontraktach w celu zapewnienia długoterminowej trwałości. Innym sposobem na zachowanie danych w IPFS jest współpraca z usługą przypinania (pinning service), która „przypnie” Twoje dane za Ciebie. Możesz nawet uruchomić własny węzeł IPFS i wnieść wkład w sieć, aby bezpłatnie przechowywać dane swoje i/lub innych!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(usługa przypinania IPFS)_
- [web3.storage](https://web3.storage/) _(usługa przypinania IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(usługa przypinania IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(eksplorator przypinania IPFS)_
- [4EVERLAND](https://www.4everland.org/) _(usługa przypinania IPFS)_
- [Filebase](https://filebase.com) _(usługa przypinania IPFS)_
- [Spheron Network](https://spheron.network/) _(usługa przypinania IPFS/Filecoin)_

Swarm to zdecentralizowana technologia przechowywania i dystrybucji danych z systemem zachęt do przechowywania oraz wyrocznią cen wynajmu przestrzeni dyskowej.

## Retencja danych {#data-retention}

Aby zachować dane, systemy muszą posiadać pewien rodzaj mechanizmu upewniającego się, że dane są faktycznie przechowywane.

### Mechanizm wyzwań {#challenge-mechanism}

Jednym z najpopularniejszych sposobów na upewnienie się, że dane są zachowane, jest użycie pewnego rodzaju wyzwania kryptograficznego, które jest wysyłane do węzłów, aby sprawdzić, czy nadal posiadają one dane. Prostym przykładem jest dowód dostępu (proof-of-access) w sieci Arweave. Wysyłają oni wyzwanie do węzłów, aby sprawdzić, czy posiadają one dane zarówno w najnowszym bloku, jak i w losowym bloku z przeszłości. Jeśli węzeł nie potrafi udzielić odpowiedzi, zostaje ukarany.

Rodzaje dStorage z mechanizmem wyzwań:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Decentralizacja {#decentrality}

Nie ma doskonałych narzędzi do pomiaru poziomu decentralizacji platform, ale ogólnie rzecz biorąc, warto korzystać z narzędzi, które nie wymagają żadnej formy KYC, co stanowi dowód na to, że nie są one scentralizowane.

Zdecentralizowane narzędzia bez KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Konsensus {#consensus}

Większość z tych narzędzi ma własną wersję [mechanizmu konsensusu](/developers/docs/consensus-mechanisms/), ale ogólnie opierają się one na [**dowodzie pracy (PoW)**](/developers/docs/consensus-mechanisms/pow/) lub [**dowodzie stawki (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Oparte na dowodzie pracy (PoW):

- Skynet
- Arweave

Oparte na dowodzie stawki (PoS):

- Ethereum
- Filecoin
- Züs
- Crust Network

## Powiązane narzędzia {#related-tools}

**IPFS – _InterPlanetary File System to zdecentralizowany system przechowywania i odwoływania się do plików dla Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentacja](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS – _Bezpieczny, prywatny i kompatybilny z S3 zdecentralizowany magazyn obiektów w chmurze dla programistów._**

- [Storj.io](https://storj.io/)
- [Dokumentacja](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia – _Wykorzystuje kryptografię do stworzenia niewymagającego zaufania rynku przechowywania w chmurze, umożliwiając kupującym i sprzedającym bezpośrednie zawieranie transakcji._**

- [Skynet.net](https://sia.tech/)
- [Dokumentacja](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin – _Filecoin został stworzony przez ten sam zespół, który stoi za IPFS. Jest to warstwa zachęt oparta na ideałach IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentacja](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave – _Arweave to platforma dStorage do przechowywania danych._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentacja](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs – _Züs to platforma dStorage oparta na dowodzie stawki (PoS) z shardingiem i blobberami._**

- [zus.network](https://zus.network/)
- [Dokumentacja](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network – _Crust to platforma dStorage zbudowana na bazie IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentacja](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm – _Rozproszona platforma przechowywania danych i usługa dystrybucji treści dla stosu Web3 Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentacja](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB – _Zdecentralizowana baza danych peer-to-peer zbudowana na bazie IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentacja](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im – _Zdecentralizowany projekt chmurowy (baza danych, przechowywanie plików, obliczenia i zdecentralizowana tożsamość (DID)). Unikalne połączenie technologii peer-to-peer pozałańcuchowej (offchain) i onchain. Kompatybilność z IPFS i wieloma łańcuchami._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentacja](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic – _Kontrolowane przez użytkownika przechowywanie baz danych IPFS dla bogatych w dane i angażujących aplikacji._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentacja](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase – _Kompatybilne z S3 zdecentralizowane przechowywanie danych i georedundantna usługa przypinania IPFS. Wszystkie pliki przesłane do IPFS za pośrednictwem Filebase są automatycznie przypinane do infrastruktury Filebase z trzykrotną replikacją na całym świecie._**

- [Filebase.com](https://filebase.com/)
- [Dokumentacja](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND – _Platforma przetwarzania w chmurze Web 3.0, która integruje podstawowe możliwości przechowywania, obliczeń i sieci, jest kompatybilna z S3 i zapewnia synchroniczne przechowywanie danych w zdecentralizowanych sieciach przechowywania, takich jak IPFS i Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentacja](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido – _Platforma blockchain-as-a-service z węzłami IPFS uruchamianymi jednym kliknięciem_**

- [Kaleido](https://kaleido.io/)
- [Dokumentacja](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network – _Spheron to platforma jako usługa (PaaS) zaprojektowana dla zdecentralizowanych aplikacji (dapp), które chcą uruchomić swoje aplikacje na zdecentralizowanej infrastrukturze z najlepszą wydajnością. Zapewnia domyślnie obliczenia, zdecentralizowane przechowywanie danych, CDN i hosting stron internetowych._**

- [spheron.network](https://spheron.network/)
- [Dokumentacja](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 – _Resolver dla zdecentralizowanych stron internetowych, podobny do eth.limo, obsługujący wszystkie typy i nieograniczający się do ENS i IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass – _Wyszukiwarka dla zdecentralizowanych stron internetowych opartych na IPFS i ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Dokumentacja](https://www.web3compass.net/statistics)

## Dalsza lektura {#further-reading}

- [Czym jest zdecentralizowane przechowywanie danych?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) – _CoinMarketCap_
- [Obalanie pięciu powszechnych mitów na temat zdecentralizowanego przechowywania danych](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) – _Storj_

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Frameworki programistyczne](/developers/docs/frameworks/)