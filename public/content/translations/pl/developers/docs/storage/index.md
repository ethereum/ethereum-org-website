---
title: "Zdecentralizowana pamięć"
description: "Przegląd tego, czym jest zdecentralizowana pamięć masowa i dostępne narzędzia do integracji z dappką."
lang: pl
---

W przeciwieństwie do scentralizowanego serwera zarządzanego przez konkretną firmę lub organizację, systemy pamięci zdecentralizowanej składają się z sieci peer-to-peer, w której operatorami są użytkownicy, którzy przechowują część danych, tworząc odporny system współdzielenia pamięci masowej. Mogą one występować w aplikacjach opartych na technologii blockchain lub innych sieciach peer-to-peer.

Samo Ethereum może być używane jako zdecentralizowany system pamięci masowej i jest nim w zakresie przechowywania kodu wszystkich inteligentnych kontraktów. Ethereum jednakże nie zostało stworzone z myślą o przechowywaniu dużych ilości danych. Łańcuch stale rośnie, ale w chwili pisania tego tekstu łańcuch Ethereum ma rozmiar około 500 GB – 1 TB ([w zależności od klienta](https://etherscan.io/chartsync/chaindefault)), a każdy węzeł w sieci musi być w stanie przechować wszystkie te dane. Jeśli łańcuch miałby rozrosnąć się do większych rozmiarów (powiedzmy 5 TB), mogłoby to być niewykonalne dla części z węzłów. Ponadto koszt wdrożenia tak dużej ilości danych w sieci Mainnet byłby zaporowo wysoki ze względu na opłaty za [gaz](/developers/docs/gas).

W związku z tymi ograniczeniami potrzebne są inne łańcuchy lub metody przechowywania dużych ilości danych w sposób zdecentralizowany.

Rozważając różne opcje zdecentralizowanej pamięci masowej (dStorage), użytkownik powinien pamiętać o kilku kwestiach.

- Mechanizm trwałości / struktura zachęt
- Egzekwowanie odpowiedniego przechowywania danych
- Decentralizacja
- Konsensus

## Mechanizm trwałości / struktura zachęt {#persistence-mechanism}

### Oparte na blockchainie {#blockchain-based}

Jeśli element danych ma przetrwać na zawsze, trzeba skorzystać z mechanizmu trwałości danych. W przykładzie Ethereum mechanizm trwałości oparty jest na założeniu, że cały łańcuch musi być zawarty na każdym węźle sieci. Nowe fragmenty danych dołączane są do końca łańcucha, więc rośnie on nieustannie, tworząc potrzebę replikacji całości zamieszczonych na nim danych przez każdy z węzłów.

Jest to znane jako trwałość **oparta na blockchainie**.

Problem z trwałością opartą na blockchainie polega na tym, że łańcuch mógłby stać się zbyt duży, aby można było realnie utrzymywać i przechowywać wszystkie dane (np. [wiele źródeł](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) szacuje, że Internet wymaga ponad 40 zetabajtów pojemności magazynowej).

Blockchain musi mieć również jakiś rodzaj struktury zachęt. Za trwałość opartą na blockchainie przewidziana jest opłata dla walidatora. Kiedy dane dołączone są do łańcucha, walidatorowi płaci się za ich dodanie.

Platformy z trwałością opartą o blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Oparta na kontrakcie {#contract-based}

**Trwałość oparta na kontrakcie** opiera się na założeniu, że dane nie mogą być replikowane przez każdy węzeł i przechowywane na zawsze, a zamiast tego muszą być utrzymywane za pomocą umów kontraktowych. Są to porozumienia zawarte pomiędzy wieloma węzłami, które zobowiązały się przechowywać fragment danych przez pewien okres. Muszą być zwrócone lub odnowione, kiedy się wyczerpią, aby utrzymać trwałość danych.

W większości przypadków, zamiast przechowywać całość danych na łańcuchu, hasz lokalizacji danych jest na nim przechowywany. Dzięki temu cały łańcuch nie musi być skalowany, aby utrzymać wszystkie dane.

Platformy z trwałością opartą na kontrakcie:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Dodatkowe uwagi {#additional-consideration}

IPFS jest rozproszonym systemem przechowywania i dostępu do plików, stron internetowych, aplikacji oraz danych. Nie ma wbudowanego schematu zachęt, ale może, zamiast tego być używany z każdym wspomnianym powyżej rozwiązaniem motywacyjnym, aby zapewnić dłuższą trwałość. Inną metodą utrwalania danych w IPFS jest współpraca z usługą przypinania, która "przypnie" Twoje dane za ciebie. Możesz nawet uruchomić własny węzeł IPFS i przyczynić się do utrwalania własnych danych oraz danych innych osób całkowicie za darmo!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(usługa przypinania IPFS)_
- [web3.storage](https://web3.storage/) _(usługa przypinania dla IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(usługa przypinania IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(eksplorator przypinania IPFS)_
- [4EVERLAND](https://www.4everland.org/) _(usługa przypinania IPFS)_
- [Filebase](https://filebase.com) _(usługa przypinania IPFS)_
- [Spheron Network](https://spheron.network/) _(usługa przypinania dla IPFS/Filecoin)_

SWARM to zdecentralizowana metoda przechowywania i dystrybucji danych z systemem zachęt za przechowywanie i wyrocznią cen wynajmu pamięci.

## Przechowywanie danych {#data-retention}

Aby zachować dane, system musi mieć jakiś mechanizm ich zachowania.

### Mechanizm wyzwań {#challenge-mechanism}

Jednym z najpopularniejszych sposób na upewnienie się, że dane są zachowane, jest zastosowanie kryptograficznego wyzwania, które jest przedstawiane węzłowi, aby upewnić się, że wciąż ma dane. Prostym przykładem jest dowód dostępu od Arweave. Przedstawiają węzłowi wyzwanie, aby sprawdzić, czy posiada dane w najnowszym bloku oraz losowo wybranym bloku z przeszłości. Jeśli węzeł nie potrafi odpowiedzieć, zostaje ukarany.

Typy zdecentralizowanej pamięci z mechanizmami wyzwań:

- Züs
- Skynet
- Arweave
- Filecoin
- Sieć Crust
- 4EVERLAND

### Decentralizacja {#decentrality}

Nie ma świetnych narzędzi, by zmierzyć poziom decentralizacji platform, ale ogólnie rzecz biorąc, warto używać narzędzi, które nie używają potwierdzania tożsamości użytkownika. W ten sposób dostarczają one dowodu na to, że nie są scentralizowane.

Zdecentralizowane narzędzia bez KYC:

- Skynet
- Arweave
- Filecoin
- IPFS - Inter-Planetarny System Plików jest to zdecentralizowana pamięć i system nawiązywania plików w Ethereum
- Ethereum
- Sieć Crust
- 4EVERLAND

### Konsensus {#consensus}

Większość z tych narzędzi ma własną wersję [mechanizmu konsensusu](/developers/docs/consensus-mechanisms/), ale generalnie opierają się one na [**dowodzie pracy (PoW)**](/developers/docs/consensus-mechanisms/pow/) lub [**dowodzie stawki (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Oparte na proof-of-work:

- Skynet
- Arweave

Oparte na proof-of-stake:

- Ethereum
- Filecoin
- Züs
- Sieć Crust

## Powiązane narzędzia {#related-tools}

**IPFS - _InterPlanetary File System to zdecentralizowany system przechowywania i odwoływania się do plików dla Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Dokumentacja](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Bezpieczna, prywatna i kompatybilna z S3 zdecentralizowana chmurowa pamięć masowa obiektów dla deweloperów._**

- [Storj.io](https://storj.io/)
- [Dokumentacja](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Wykorzystuje kryptografię do stworzenia niewymagającego zaufania rynku chmurowej pamięci masowej, pozwalając kupującym i sprzedającym na bezpośrednie przeprowadzanie transakcji._**

- [Skynet.net](https://sia.tech/)
- [Dokumentacja](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin został stworzony przez ten sam zespół, który stoi za IPFS To warstwa wyposażona w zachęty oparta na ideałach IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Dokumentacja](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave to platforma zdecentralizowanej pamięci masowej (dStorage) do przechowywania danych._**

- [Arweave.org](https://www.arweave.org/)
- [Dokumentacja](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs to platforma dStorage typu proof-of-stake (dowód stawki) z shardingiem i blobberami._**

- [zus.network](https://zus.network/)
- [Dokumentacja](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust to platforma zdecentralizowanej pamięci masowej (dStorage) działająca na bazie IPFS._**

- [Crust.network](https://crust.network)
- [Dokumentacja](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Rozproszona platforma pamięci masowej i usługa dystrybucji treści dla stosu web3 Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Dokumentacja](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Zdecentralizowana baza danych peer-to-peer działająca na IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Dokumentacja](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Zdecentralizowany projekt chmurowy (baza danych, przechowywanie plików, moc obliczeniowa i DID). Unikalne połączenie technologi peer-to-peer na łańcuchu i poza nim. IPFS i kompatybilność wielołańcuchowa._**

- [Aleph.im](https://aleph.cloud/)
- [Dokumentacja](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Kontrolowana przez użytkownika baza danych IPFS do przechowywania danych dla bogatych w dane i angażujących aplikacji._**

- [Ceramic.network](https://ceramic.network/)
- [Dokumentacja](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Kompatybilna z S3 zdecentralizowana pamięć masowa i geo-redundantna usługa przypinania IPFS. Wszystkie pliki przesłane do IPFS przez Filebase są automatycznie przypinane do infrastruktury Filebase z potrójną replikacją na całym świecie._**

- [Filebase.com](https://filebase.com/)
- [Dokumentacja](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Platforma chmury obliczeniowej Web 3.0, która integruje podstawowe funkcje przechowywania, obliczeń i sieci, jest kompatybilna z S3 i zapewnia synchroniczne przechowywanie danych w zdecentralizowanych sieciach pamięci masowej, takich jak IPFS i Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Dokumentacja](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Platforma typu blockchain jako usługa (BaaS) z węzłami IPFS dostępnymi na jedno kliknięcie._**

- [Kaleido](https://kaleido.io/)
- [Dokumentacja](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron to platforma jako usługa (PaaS) zaprojektowana dla dappek, które chcą uruchamiać swoje aplikacje na zdecentralizowanej infrastrukturze z najlepszą wydajnością. Zapewnia od ręki moc obliczeniową, zdecentralizowaną pamięć masową, CDN i hosting stron internetowych._**

- [spheron.network](https://spheron.network/)
- [Dokumentacja](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Dalsza lektura {#further-reading}

- [Czym jest zdecentralizowana pamięć masowa?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Obalamy pięć popularnych mitów na temat zdecentralizowanej pamięci masowej](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Frameworki deweloperskie](/developers/docs/frameworks/)
