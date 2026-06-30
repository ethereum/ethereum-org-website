---
title: Sieci
description: "Przegląd sieci Ethereum oraz informacje, gdzie zdobyć testowe ethery (ETH) do testowania Twojej aplikacji."
lang: pl
---

Sieci [Ethereum](/) to grupy połączonych komputerów, które komunikują się za pomocą protokołu Ethereum. Istnieje tylko jedna sieć główna Ethereum, ale do celów testowych i programistycznych można tworzyć niezależne sieci zgodne z tymi samymi regułami protokołu. Istnieje wiele niezależnych „sieci”, które są zgodne z protokołem, ale nie wchodzą ze sobą w interakcje. Możesz nawet uruchomić jedną z nich lokalnie na własnym komputerze, aby testować swoje inteligentne kontrakty i aplikacje Web3.

Twoje konto Ethereum będzie działać w różnych sieciach, ale saldo konta i historia transakcji nie zostaną przeniesione z głównej sieci Ethereum. Do celów testowych warto wiedzieć, jakie sieci są dostępne i jak zdobyć testowe ETH do eksperymentowania. Ogólnie rzecz biorąc, ze względów bezpieczeństwa nie zaleca się ponownego używania kont z sieci głównej w sieciach testowych i odwrotnie.

## Wymagania wstępne {#prerequisites}

Zanim zaczniesz czytać o różnych sieciach, powinieneś zrozumieć [podstawy Ethereum](/developers/docs/intro-to-ethereum/), ponieważ sieci testowe zapewnią Ci tanią i bezpieczną wersję Ethereum do eksperymentowania.

## Sieci publiczne {#public-networks}

Sieci publiczne są dostępne dla każdego na świecie, kto ma połączenie z internetem. Każdy może odczytywać lub tworzyć transakcje na publicznym blockchainie oraz walidować wykonywane transakcje. Konsensus między węzłami decyduje o włączeniu transakcji i stanie sieci.

### Sieć główna Ethereum {#ethereum-mainnet}

Sieć główna (Mainnet) to podstawowy publiczny produkcyjny blockchain Ethereum, w którym w rozproszonym rejestrze odbywają się transakcje o rzeczywistej wartości.

Kiedy ludzie i giełdy dyskutują o cenach ETH, mają na myśli ETH w sieci głównej.

### Sieci testowe Ethereum {#ethereum-testnets}

Oprócz sieci głównej istnieją publiczne sieci testowe. Są to sieci używane przez deweloperów protokołu lub twórców inteligentnych kontraktów do testowania zarówno aktualizacji protokołu, jak i potencjalnych inteligentnych kontraktów w środowisku zbliżonym do produkcyjnego przed wdrożeniem do sieci głównej. Pomyśl o tym jako o odpowiedniku serwerów produkcyjnych i testowych (staging).

Powinieneś przetestować każdy napisany kod kontraktu w sieci testowej przed wdrożeniem go do sieci głównej. Wśród zdecentralizowanych aplikacji (dapp), które integrują się z istniejącymi inteligentnymi kontraktami, większość projektów ma kopie wdrożone w sieciach testowych.

Większość sieci testowych zaczynała od wykorzystania mechanizmu konsensusu dowodu autorytetu (PoA) wymagającego zezwolenia. Oznacza to, że niewielka liczba węzłów jest wybierana do walidacji transakcji i tworzenia nowych bloków – stawiając przy tym na szali swoją tożsamość. Alternatywnie, niektóre sieci testowe oferują otwarty mechanizm konsensusu dowodu stawki (PoS), w którym każdy może przetestować uruchomienie walidatora, podobnie jak w sieci głównej Ethereum.

ETH w sieciach testowych z założenia nie ma rzeczywistej wartości; jednakże powstały rynki dla pewnych rodzajów testowego ETH, które stało się rzadkie lub trudne do zdobycia. Ponieważ potrzebujesz ETH, aby faktycznie wchodzić w interakcje z Ethereum (nawet w sieciach testowych), większość ludzi otrzymuje testowe ETH za darmo z kraników. Większość kraników to aplikacje internetowe, w których możesz wprowadzić adres, na który prosisz o przesłanie ETH.

#### Której sieci testowej powinienem użyć? {#which-testnet-should-i-use}

Dwie publiczne sieci testowe, które są obecnie utrzymywane przez deweloperów klientów, to Sepolia i Hoodi. Sepolia to sieć dla twórców kontraktów i aplikacji do testowania ich rozwiązań. Sieć Hoodi pozwala deweloperom protokołu testować aktualizacje sieci, a stakerom testować uruchamianie walidatorów.

#### Sepolia {#sepolia}

**Sepolia to zalecana domyślna sieć testowa do tworzenia aplikacji**. Sieć Sepolia wykorzystuje zestaw walidatorów wymagający zezwolenia, kontrolowany przez zespoły klienckie i testowe.

##### Zasoby {#} {#} {#} {#} {#}

- [Strona internetowa](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Kraniki {#} {#} {#} {#}

- [Kranik Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Kranik Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Kranik Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Kranik Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Kranik ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [Kranik Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Kranik Infura Sepolia](https://www.infura.io/faucet)
- [Kranik PoW](https://sepolia-faucet.pk910.de/)
- [Kranik QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi to sieć testowa do testowania walidacji i stakingu. Sieć Hoodi jest otwarta dla użytkowników chcących uruchomić walidator w sieci testowej. Stakerzy chcący przetestować aktualizacje protokołu przed ich wdrożeniem do sieci głównej powinni zatem korzystać z Hoodi.

- Otwarty zestaw walidatorów, stakerzy mogą testować aktualizacje sieci
- Duży stan, przydatny do testowania złożonych interakcji inteligentnych kontraktów
- Dłuższa synchronizacja i wymaga więcej pamięci masowej do uruchomienia węzła

##### Zasoby

- [Strona internetowa](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Eksplorator](https://explorer.hoodi.ethpandaops.io/)
- [Synchronizacja punktu kontrolnego](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Kraniki

- [Kranik Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Kranik Hoodi](https://hoodi.ethpandaops.io/)
- [Kranik PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery to unikalny rodzaj sieci testowej, która w pełni resetuje się co miesiąc. Stan wykonania i konsensusu powraca do bloku genezy co 28 dni, co oznacza, że wszystko, co dzieje się w sieci testowej, jest ulotne. Dzięki temu jest idealna do krótkoterminowych testów, szybkiego uruchamiania węzłów i aplikacji typu „hello world”, które nie wymagają trwałości.

- Zawsze świeży stan, krótkoterminowe testowanie walidatorów i aplikacji
- Zawiera tylko podstawowy zestaw kontraktów
- Otwarty zestaw walidatorów i łatwy dostęp do dużych ilości środków
- Najmniejsze wymagania dla węzła i najszybsza synchronizacja, średnio &lt;5GB

##### Zasoby

- [Strona internetowa](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Czat społeczności](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Eksplorator Beacon](https://beaconlight.ephemery.dev/)
- [Synchronizacja punktu kontrolnego](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Kraniki {#faucets}

- [Kranik Bordel](https://faucet.bordel.wtf/)
- [Kranik Pk910 PoW](https://ephemery-faucet.pk910.de/)

#### Holesky (przestarzała) {#holesky}

Sieć testowa Holesky jest przestarzała od września 2025 r. Operatorzy stakingu i dostawcy infrastruktury powinni zamiast tego używać Hoodi do testowania walidatorów.

- [Ogłoszenie o wyłączeniu sieci testowej Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1 września 2025 r._
- [Aktualizacje sieci testowych Holesky i Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog EF, 18 marca 2025 r._

### Sieci testowe warstwy 2 {#layer-2-testnets}

[Warstwa 2 (L2)](/layer-2/) to zbiorcze określenie opisujące określony zestaw rozwiązań skalujących Ethereum. Warstwa 2 to oddzielny blockchain, który rozszerza Ethereum i dziedziczy jego gwarancje bezpieczeństwa. Sieci testowe warstwy 2 są zazwyczaj ściśle powiązane z publicznymi sieciami testowymi Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sieć testowa dla [Arbitrum](https://arbitrum.io/).

##### Zasoby

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Kraniki

- [Kranik Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Kranik Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [Kranik ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [Kranik QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Sieć testowa dla [Optimism](https://www.optimism.io/).

##### Zasoby

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Kraniki

- [Kranik Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Kranik Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Kranik ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [Kranik sieci testowej](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Sieć testowa dla [Starknet](https://www.starknet.io).

##### Zasoby

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Kraniki

- [Kranik Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Kranik Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Kranik Starknet](https://starknet-faucet.vercel.app/)

## Sieci prywatne {#private-networks}

Sieć Ethereum jest siecią prywatną, jeśli jej węzły nie są połączone z siecią publiczną (tj. siecią główną lub siecią testową). W tym kontekście słowo „prywatna” oznacza jedynie zarezerwowana lub odizolowana, a nie chroniona czy bezpieczna.

### Sieci deweloperskie {#development-networks}

Aby stworzyć aplikację Ethereum, będziesz chciał uruchomić ją w sieci prywatnej, aby zobaczyć, jak działa, przed jej wdrożeniem. Podobnie jak tworzysz lokalny serwer na swoim komputerze do tworzenia stron internetowych, możesz utworzyć lokalną instancję blockchaina, aby przetestować swoją zdecentralizowaną aplikację (dapp). Pozwala to na znacznie szybszą iterację niż w przypadku publicznej sieci testowej.

Istnieją projekty i narzędzia dedykowane do pomocy w tym zakresie. Dowiedz się więcej o [sieciach deweloperskich](/developers/docs/development-networks/).

### Sieci konsorcjum {#consortium-networks}

Proces konsensusu jest kontrolowany przez wstępnie zdefiniowany zestaw zaufanych węzłów. Na przykład prywatna sieć znanych instytucji akademickich, z których każda zarządza jednym węzłem, a bloki są walidowane przez próg sygnatariuszy w sieci.

Jeśli publiczna sieć Ethereum przypomina publiczny internet, sieć konsorcjum przypomina prywatny intranet.

## <Emoji text="🚉" /> Dlaczego sieci testowe Ethereum noszą nazwy stacji metra? {#why-naming}

Wiele sieci testowych Ethereum nosi nazwy prawdziwych stacji metra lub pociągów. Ta tradycja nazewnictwa rozpoczęła się wcześnie i odzwierciedla globalne miasta, w których mieszkali lub pracowali współtwórcy. Jest to symboliczne, łatwe do zapamiętania i praktyczne. Podobnie jak sieci testowe są odizolowane od sieci głównej Ethereum, linie metra biegną oddzielnie od ruchu naziemnego.

### <Emoji text="🚧" /> Powszechnie używane i starsze sieci testowe {#common-and-legacy-testnets}

- **Sepolia** - Dzielnica w Atenach (Grecja) połączona z metrem. Obecnie używana do testowania inteligentnych kontraktów i zdecentralizowanych aplikacji (dapp).
- **Hoodi** - Nazwana na cześć stacji metra Hoodi w Bengaluru (Indie). Używana do testowania walidatorów i aktualizacji protokołu.
- **Goerli** _(przestarzała)_ - Nazwana na cześć Görlitzer Bahnhof w Berlinie (Niemcy).
- **Rinkeby** _(przestarzała)_ - Nazwana na cześć przedmieścia Sztokholmu ze stacją metra.
- **Ropsten** _(przestarzała)_ - Odnosi się do obszaru i dawnego terminalu promowego/metra w Sztokholmie.
- **Kovan** _(przestarzała)_ - Nazwana na cześć stacji MRT w Singapurze.
- **Morden** _(przestarzała)_ - Nazwana na cześć stacji londyńskiego metra. Pierwsza publiczna sieć testowa Ethereum.

### <Emoji text="🧪" /> Inne specjalistyczne sieci testowe {#other-testnets}

Niektóre sieci testowe zostały stworzone do krótkoterminowych testów lub testów specyficznych dla aktualizacji i niekoniecznie mają motyw metra:

- **Holesky** _(przestarzała)_ - Nazwana na cześć stacji Holešovice w Pradze. Używana do testowania walidatorów; przestarzała w 2025 r.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(wszystkie przestarzałe)_ oraz **Ephemery** - Zbudowane specjalnie do symulacji aktualizacji, takich jak The Merge, Szanghaj, lub eksperymentów z walidatorami. Niektóre nazwy są raczej regionalne lub tematyczne niż oparte na metrze.

Używanie nazw stacji metra pomaga deweloperom szybko identyfikować i zapamiętywać sieci testowe bez konieczności polegania na numerycznych identyfikatorach łańcucha (chain ID). Odzwierciedla to również kulturę Ethereum: praktyczną, globalną i skoncentrowaną na człowieku.

## Powiązane narzędzia {#related-tools}

- [Chainlist](https://chainlist.org/) _lista sieci EVM do łączenia portfeli i dostawców z odpowiednim identyfikatorem łańcucha (Chain ID) i identyfikatorem sieci (Network ID)_
- [Łańcuchy oparte na EVM](https://github.com/ethereum-lists/chains) _repozytorium GitHub z metadanymi łańcuchów, które zasila Chainlist_

## Dalsza lektura {#further-reading}

- [Propozycja: Przewidywalny cykl życia sieci testowej Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ewolucja sieci testowych Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
