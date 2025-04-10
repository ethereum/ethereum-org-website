---
title: Sieci
description: Przegląd sieci Ethereum i informacje o miejscach, w których można uzyskać ether testnetowy (ETH) do testowania aplikacji.
lang: pl
---

Sieci Ethereum to grupy połączonych komputerów, które komunikują się za pomocą protokołu Ethereum. Istnieje tylko jedna sieć główna Ethereum, ale do celów testowych i rozwojowych można tworzyć niezależne sieci zgodne z tymi samymi zasadami protokołu. Istnieje wiele niezależnych "sieci", które są zgodne z protokołem bez interakcji między sobą. Możesz nawet uruchomić jedną lokalnie na własnym komputerze do testowania inteligentnych kontraktów i aplikacji web3.

Twoje konto Ethereum będzie działać w różnych sieciach, ale saldo konta i historia transakcji nie będą przenoszone z głównej sieci Ethereum. Do celów testowych warto wiedzieć, które sieci są dostępne i jak uzyskać testnetowe ETH do zabawy. Ogólnie rzecz biorąc, ze względów bezpieczeństwa nie zaleca się ponownego używania kont sieci głównej w sieciach testowych i odwrotnie.

## Warunki wstępne {#prerequisites}

Przed zapoznaniem się z różnymi sieciami powinieneś zrozumieć [podstawy Ethereum](/developers/docs/intro-to-ethereum/), ponieważ sieci testowe dadzą ci tanią, bezpieczną wersję Ethereum do zabawy.

## Sieci publiczne {#public-networks}

Sieci publiczne są dostępne dla każdego, kto ma połączenie internetowe. Każdy może odczytywać lub tworzyć transakcje w publicznym blockchainie i weryfikować wykonywane transakcje. Konsensus między uczestnikami decyduje o włączeniu transakcji i stanie sieci.

### Sieć główna Ethereum {#ethereum-mainnet}

Sieć główna jest głównym publicznym blockchainem produkcyjnym Ethereum, w którym w księdze rozproszonej dochodzi do transakcji o rzeczywistej wartości.

Kiedy ludzie i giełdy rozmawiają o cenach ETH, mówią o ETH sieci głównej.

### Sieci testowe Ethereum {#ethereum-testnets}

Oprócz sieci głównej istnieją publiczne sieci testowe. Są to sieci wykorzystywane przez deweloperów protokołów lub inteligentnych kontraktów do testowania zarówno aktualizacji protokołu, jak i potencjalnych inteligentnych kontraktów w środowisku produkcyjnym przed wdrożeniem do sieci głównej. Można to traktować jako analogię relacji pomiędzy serwerami produkcyjnymi i pośredniczącymi.

Każdy napisany kod kontraktu należy przetestować w sieci testowej przed wdrożeniem go w sieci głównej. Wśród zdecentralizowanych aplikacji, które integrują się z istniejącymi inteligentnymi kontraktami, większość projektów ma kopie wdrożone w sieciach testowych.

Większość sieci testowych zaczynała od korzystania z mechanizmu konsensusu dowodu autorytetu (proof-of-authority). Oznacza to, że niewielka liczba węzłów jest wybierana w celu weryfikacji transakcji i tworzenia nowych bloków, potwierdzając swoją tożsamość w tym procesie. Ewentualnie niektóre sieci testowe oferują otwarty mechanizm konsensusu proof-of-stake, w którym każdy może przetestować uruchomienie walidatora, podobnie jak w przypadku sieci głównej Ethereum.

ETH w sieciach testowych nie powinno mieć żadnej realnej wartości, jednak powstały rynki dla niektórych rodzajów testnetowych ETH, które stały się rzadkie lub trudne do zdobycia. Ponieważ potrzebujesz ETH do faktycznej interakcji z Ethereum (nawet w sieciach testowych), większość ludzi uzyskuje testnetowe ETH za darmo z kranów. Większość kranów to aplikacje internetowe, do których możesz wprowadzić adres, na który ma zostać wysłane ETH.

#### Której sieci testowej powinienem użyć?

Dwie publiczne sieci testowe, które obecnie wykorzystują programiści klientów, to Sepolia i Hoodi. Sepolia to sieć dla twórców kontraktów i aplikacji przeznaczona do testowania aplikacji. Sieć Hoodi pozwala programistom protokołów testować aktualizacje sieci, a stakerom testować uruchomienie walidatorów.

#### Sepolia {#sepolia}

**Sepolia to zalecana domyślna sieć testowa do rozwoju aplikacji**. Sieć Sepolia wykorzystuje zamknięty zestaw walidatorów. Jest stosunkowo nowa, co oznacza, że zarówno jej stan, jak i historia są bardzo małe. Oznacza to, że sieć szybko się synchronizuje, a uruchomienie węzła wymaga mniej pamięci masowej. Jest to przydatne dla użytkowników, którzy chcą szybko uruchomić węzeł i bezpośrednio komunikować się z siecią.

- Zamknięty zestaw walidatorów, zarządzany przez zespoły klientów i testów
- Nowa sieć testowa, mniej wdrożonych aplikacji niż w innych sieciach testowych
- Szybka synchronizacja i wymaga minimalnej przestrzeni dyskowej do uruchomienia węzła

##### Zasoby

- [Strona internetowa](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Kraniki

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem Faucets](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

_Uwaga: [Sieć testowa Goerli jest przestarzała](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) i została zastąpiona przez Hoodi. Rozważ migrację swoich aplikacji do Sepolia._

Hoodi to sieć testowa do testowania walidacji i stakingu. Sieć Hoodi jest otwarta dla użytkowników, którzy chcą uruchomić walidatora sieci testowej. Stakerzy, którzy chcą testować aktualizacje protokołu przed ich wdrożeniem w sieci głównej, powinni używać Hoodi.

- Otwarty zestaw walidatorów, stakerzy mogą testować aktualizacje sieci
- Duży stan, przydatny do testowania złożonych interakcji ze smart kontraktami
- Dłuższy czas synchronizacji i wymaga więcej pamięci masowej do uruchomienia węzła

##### Zasoby

- [Strona internetowa](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Kraniki

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)

Aby uruchomić Walidatora w sieci testowej Hoodi, użyj [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Sieci testowe warstwy 2 {#layer-2-testnets}

[Warstwa 2 (L2)](/layer-2/) to zbiorczy termin opisujący określony zestaw rozwiązań do skalowania Ethereum. Warstwa 2 to oddzielny blockchain, który rozszerza Ethereum i dziedziczy gwarancje bezpieczeństwa Ethereum. Sieci testowe warstwy 2 są zazwyczaj ściśle powiązane z publicznymi sieciami testowymi Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Sieć testowa dla [Arbitrum](https://arbitrum.io/).

##### Krany

- [Kran Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Kran Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Sieć testowa dla [Optimism](https://www.optimism.io/).

##### Krany

- [Kran Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Kran Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

Sieć testowa dla [Starknet](https://www.starknet.io).

##### Krany

- [Kran Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)

## Sieci prywatne {#private-networks}

Sieć Ethereum jest siecią prywatną, jeśli jej węzły nie są połączone z siecią publiczną (tj. sieć główna albo sieć testowa). W tym kontekście "prywatna" oznacza jedynie sieć zastrzeżoną lub odizolowaną, a nie chronioną lub bezpieczną.

### Frameworki programistyczne {#development-networks}

Przy tworzeniu aplikacji Ethereum będziesz chciał uruchomić ją w sieci prywatnej, aby przed jej wdrożeniem sprawdzić, jak działa. Podobnie jak wtedy, gdy tworzysz lokalny serwer na komputerze do tworzenia stron internetowych, możesz utworzyć lokalną instancję blockchainu, aby przetestować swoją zdecentralizowaną aplikację. Pozwala to na znacznie szybszą iterację niż publiczna sieć testowa.

Istnieją projekty i narzędzia pomocne w tych działaniach. Dowiedz się więcej o [sieciach programistycznych](/developers/docs/development-networks/).

### Sieci Consortium {#consortium-networks}

Proces konsensusu jest kontrolowany przez uprzednio określony zestaw zaufanych węzłów. Na przykład prywatna sieć znanych instytucji akademickich, z których każda zarządza jednym węzłem, a bloki są zatwierdzane przez próg sygnatariuszy w ramach sieci.

Jeśli publiczna sieć Ethereum jest jak publiczny Internet, to sieć Consortium jest jak prywatny intranet.

## Powiązane narzędzia {#related-tools}

- [Chainlist](https://chainlist.org/) — _lista sieci EVM do połączenia portfeli i dostawców z odpowiednim identyfikatorem łańcucha i identyfikatorem sieci_
- [ Łańcuchy oparte na EVM](https://github.com/ethereum-lists/chains) — _ repozytorium GitHub metadanych łańcucha, które zasila Chainlist_

## Dalsza lektura {#further-reading}

- [Propozycja: Przewidywalny cykl życia sieci testowej Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Ewolucja sieci testowych Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
