---
title: Sieci
description: "Przegląd sieci Ethereum i informacje o miejscach, w których można uzyskać ether testnetowy (ETH) do testowania aplikacji."
lang: pl
---

Sieci Ethereum to grupy połączonych komputerów, które komunikują się za pomocą protokołu Ethereum. Istnieje tylko jedna sieć główna Ethereum, ale do celów testowych i rozwojowych można tworzyć niezależne sieci zgodne z tymi samymi zasadami protokołu. Istnieje wiele niezależnych „sieci”, które są zgodne z protokołem bez interakcji między sobą. Możesz nawet uruchomić jedną lokalnie na własnym komputerze do testowania inteligentnych kontraktów i aplikacji web3.

Twoje konto Ethereum będzie działać w różnych sieciach, ale saldo konta i historia transakcji nie będą przenoszone z głównej sieci Ethereum. Do celów testowych warto wiedzieć, które sieci są dostępne i jak uzyskać testnetowe ETH do zabawy. Ogólnie rzecz biorąc, ze względów bezpieczeństwa nie zaleca się ponownego używania kont sieci głównej w sieciach testowych i odwrotnie.

## Wymagania wstępne {#prerequisites}

Przed zapoznaniem się z różnymi sieciami powinieneś zrozumieć [podstawy Ethereum](/developers/docs/intro-to-ethereum/), ponieważ sieci testowe dadzą ci tanią, bezpieczną wersję Ethereum do zabawy.

## Sieci publiczne {#public-networks}

Sieci publiczne są dostępne dla każdego, kto ma połączenie internetowe. Każdy może odczytywać lub tworzyć transakcje w publicznym blockchainie i weryfikować wykonywane transakcje. Konsensus między uczestnikami decyduje o włączeniu transakcji i stanie sieci.

### Sieć główna Ethereum {#ethereum-mainnet}

Sieć główna jest głównym publicznym blockchainem produkcyjnym Ethereum, w którym w księdze rozproszonej dochodzi do transakcji o rzeczywistej wartości.

Kiedy ludzie i giełdy rozmawiają o cenach ETH, mówią o ETH sieci głównej.

### Sieci testowe Ethereum {#ethereum-testnets}

Oprócz sieci głównej istnieją publiczne sieci testowe. Są to sieci wykorzystywane przez deweloperów protokołów lub deweloperów inteligentnych kontraktów do testowania zarówno aktualizacji protokołu, jak i potencjalnych inteligentnych kontraktów w środowisku produkcyjnym przed wdrożeniem do sieci głównej. Można to traktować jako analogię relacji pomiędzy serwerami produkcyjnymi i pośredniczącymi.

Każdy napisany kod kontraktu należy przetestować w sieci testowej przed wdrożeniem go w sieci głównej. Wśród zdecentralizowanych aplikacji, które integrują się z istniejącymi inteligentnymi kontraktami, większość projektów ma kopie wdrożone w sieciach testowych.

Większość sieci testowych zaczynała od korzystania z mechanizmu konsensusu dowodu autorytetu (proof-of-authority). Oznacza to, że niewielka liczba węzłów jest wybierana w celu weryfikacji transakcji i tworzenia nowych bloków, potwierdzając swoją tożsamość w tym procesie. Ewentualnie niektóre sieci testowe oferują otwarty mechanizm konsensusu proof-of-stake, w którym każdy może przetestować uruchomienie walidatora, podobnie jak w przypadku sieci głównej Ethereum.

ETH w sieciach testowych nie powinno mieć żadnej realnej wartości, jednak powstały rynki dla niektórych rodzajów testnetowych ETH, które stały się rzadkie lub trudne do zdobycia. Ponieważ potrzebujesz ETH do faktycznej interakcji z Ethereum (nawet w sieciach testowych), większość ludzi uzyskuje testnetowe ETH za darmo z kranów. Większość kranów to aplikacje internetowe, do których możesz wprowadzić adres, na który ma zostać wysłane ETH.

#### Której sieci testowej powinienem użyć?

Dwie publiczne sieci testowe utrzymywane przez programistów klienckich są obecnie Sepolia i Hoodi. Sepolia to sieć dla twórców kontraktów i aplikacji przeznaczona do testowania aplikacji. Sieć Hoodi pozwala programistom protokołu testowanie usprawnień sieci oraz umożliwia stakerom testowanie walidatorów.

#### Sepolia {#sepolia}

**Sepolia jest zalecaną domyślną siecią testową do rozwoju aplikacji**. Sieć Sepolia korzysta z zestawu uprawnionych walidatorów kontrolowanych przez zespoły klienckie i testujące.

##### Źródła

- [Strona internetowa](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Krany

- [Kran Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Kran Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Kran Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Kran ekosystemu Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Kran ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [Kran Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Kran Infura Sepolia](https://www.infura.io/faucet)
- [Kran PoW](https://sepolia-faucet.pk910.de/)
- [Kran QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi jest siecią testową przeznaczoną do testowania procesu walidacji oraz stakowania. Sieć Hoodi jest otwarta dla użytkowników chcących uruchomić walidatora na sieci testowej. Stakerzy chcący przetestować aktualizację protokołu przed wdrożeniem jej na sieci głównej, powinni zatem użyć Hoodi.

- Otwarty zestaw walidatorów, stakerzy mogą testować aktualizacje sieci
- Rozbudowany stan, przydatny do testowania złożonych interakcji inteligentnych kontraktów
- Wymaga więcej pamięci, aby uruchomić węzeł oraz dłuższego czasu synchronizacji

##### Źródła

- [Strona internetowa](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Eksplorator](https://explorer.hoodi.ethpandaops.io/)
- [Synchronizacja z punktu kontrolnego](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Krany

- [Kran Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Kran Hoodi](https://hoodi.ethpandaops.io/)
- [Kran PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery jest unikalną siecią testową, która resetuje się w pełni każdego miesiąca. Stan konsensusu przywracany jest do stanu początkowego co 28 dni, sprawiając, że wszystko, co dzieje się na sieci jest nietrwałe. To czyni Ephemery idealnym rozwiązaniem dla krótkotrwałych testów, szybkiego stawiania węzłów oraz aplikacji typu "hello world", które nie potrzebują trwałości.

- Zawsze świeży stan, krótkotrwałe testowanie walidatorów i apek
- Zawiera jedynie podstawowy zestaw kontraktów
- Otwarty zestaw walidatorów i łatwy dostęp do dużego zasobu funduszy
- Najniższe wymagania dotyczące węzła oraz najszybsza synchronizacja, &lt;średnio 5GB

##### Źródła

- [Strona internetowa](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Czat społeczności](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Eksplorator Beacon](https://beaconlight.ephemery.dev/)
- [Synchronizacja z punktu kontrolnego](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Krany

- [Kran Bordel](https://faucet.bordel.wtf/)
- [Kran PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (przestarzały) {#holesky}

Sieć testowa Holesky zostanie wycofana we wrześniu 2025 roku. Zamiast niego, stakerzy oraz dostawcy infrastruktury powinni używać Hoodi do testowania walidatorów.

- [Ogłoszenie o wyłączeniu sieci testowej Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) – _blog EF, 1 września 2025_
- [Aktualizacje sieci testowych Holesky i Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) – _blog EF, 18 marca 2025_

### Sieci testowe warstwy 2 {#layer-2-testnets}

[Warstwa 2 (L2)](/layer-2/) to zbiorczy termin opisujący określony zestaw rozwiązań do skalowania Ethereum. Warstwa 2 to oddzielny blockchain, który rozszerza Ethereum i dziedziczy gwarancje bezpieczeństwa Ethereum. Sieci testowe warstwy 2 są zazwyczaj ściśle powiązane z publicznymi sieciami testowymi Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sieć testowa dla [Arbitrum](https://arbitrum.io/).

##### Źródła

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Krany

- [Kran Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Kran Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [Kran ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [Kran QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Sieć testowa dla [Optimism](https://www.optimism.io/).

##### Źródła

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Krany

- [Kran Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Kran Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Kran ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [Kran sieci testowej](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Sieć testowa dla [Starknet](https://www.starknet.io).

##### Źródła

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Krany

- [Kran Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Kran Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Kran Starknet](https://starknet-faucet.vercel.app/)

## Sieci prywatne {#private-networks}

Sieć Ethereum jest siecią prywatną, jeśli jej węzły nie są podłączone do sieci publicznej (tj. sieci głównej lub sieci testowej). W tym kontekście „prywatna” oznacza jedynie sieć zastrzeżoną lub odizolowaną, a nie chronioną lub bezpieczną.

### Sieci deweloperskie {#development-networks}

Przy tworzeniu aplikacji Ethereum będziesz chciał uruchomić ją w sieci prywatnej, aby przed jej wdrożeniem sprawdzić, jak działa. Podobnie jak wtedy, gdy tworzysz lokalny serwer na komputerze do tworzenia stron internetowych, możesz utworzyć lokalną instancję blockchainu, aby przetestować swoją zdecentralizowaną aplikację. Pozwala to na znacznie szybszą iterację niż publiczna sieć testowa.

Istnieją projekty i narzędzia pomocne w tych działaniach. Dowiedz się więcej o [sieciach deweloperskich](/developers/docs/development-networks/).

### Sieci konsorcjum {#consortium-networks}

Proces konsensusu jest kontrolowany przez uprzednio określony zestaw zaufanych węzłów. Na przykład prywatna sieć znanych instytucji akademickich, z których każda zarządza jednym węzłem, a bloki są zatwierdzane przez próg sygnatariuszy w ramach sieci.

Jeśli publiczna sieć Ethereum jest jak publiczny Internet, to sieć Consortium jest jak prywatny intranet.

## <Emoji text="🚉" /> Dlaczego sieci testowe Ethereum noszą nazwy stacji metra? {#why-naming}

Wiele sieci testowych Ethereum nosi nazwy prawdziwych stacji metra lub pociągów. Ta tradycja nazewnictwa zaczęła się wcześnie i odzwierciedla globalne miasta, w których mieszkali lub pracowali współtwórcy. Jest symboliczna, zapadająca w pamięć i praktyczna. Tak jak sieci testowe są odizolowane od sieci głównej Ethereum, tak linie metra działają oddzielnie od ruchu naziemnego.

### <Emoji text="🚧" /> Powszechnie używane i starsze sieci testowe {#common-and-legacy-testnets}

- **Sepolia** – dzielnica w Atenach (Grecja) połączona z metrem. Obecnie używana do testowania inteligentnych kontraktów i dapek.
- **Hoodi** – nazwa pochodzi od stacji metra Hoodi w Bengaluru w Indiach. Używana do testowania walidatorów i aktualizacji protokołów.
- **Goerli** _(przestarzały)_ – nazwa pochodzi od dworca Görlitzer Bahnhof w Berlinie w Niemczech.
- **Rinkeby** _(przestarzały)_ – nazwa pochodzi od przedmieścia Sztokholmu ze stacją metra.
- **Ropsten** _(przestarzały)_ – odnosi się do obszaru i dawnego terminalu promowego/metra w Sztokholmie.
- **Kovan** _(przestarzały)_ – nazwa pochodzi od stacji MRT w Singapurze.
- **Morden** _(przestarzały)_ – nazwa pochodzi od stacji londyńskiego metra. Pierwsza publiczna sieć testowa Ethereum.

### <Emoji text="🧪" /> Inne wyspecjalizowane sieci testowe {#other-testnets}

Niektóre sieci testowe zostały stworzone do krótkoterminowych testów lub testów specyficznych dla aktualizacji i niekoniecznie mają motyw metra:

- **Holesky** _(przestarzały)_ – nazwa pochodzi od stacji Holešovice w Pradze. Używana do testowania walidatorów; wycofana w 2025 r.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(wszystkie przestarzałe)_ i **Ephemery** – stworzone specjalnie do symulacji aktualizacji, takich jak Połączenie, Szanghaj lub eksperymentów z walidatorami. Niektóre nazwy mają charakter regionalny lub tematyczny, a nie oparty na metrze.

Używanie nazw stacji metra pomaga deweloperom szybko identyfikować i zapamiętywać sieci testowe bez konieczności polegania na numerycznych identyfikatorach łańcucha. Odzwierciedla również kulturę Ethereum: praktyczną, globalną i skoncentrowaną na człowieku.

## Powiązane narzędzia {#related-tools}

- [Chainlist](https://chainlist.org/) _lista sieci EVM do połączenia portfeli i dostawców z odpowiednim identyfikatorem łańcucha i identyfikatorem sieci_
- [Łańcuchy oparte na EVM](https://github.com/ethereum-lists/chains) _repozytorium GitHub z metadanymi łańcucha, które zasilają Chainlist_

## Dalsza lektura {#further-reading}

- [Propozycja: Przewidywalny cykl życia sieci testowych Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ewolucja sieci testowych Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
