---
title: Sieci
description: Przegląd sieci Ethereum i informacje o miejscach, w których można uzyskać ether testnetowy (ETH) do testowania aplikacji.
lang: pl
---

Sieci Ethereum to grupy połączonych komputerów, które komunikują się za pomocą protokołu Ethereum. Istnieje tylko jedna sieć główna Ethereum, ale do celów testowych i rozwojowych można tworzyć niezależne sieci zgodne z tymi samymi zasadami protokołu. Istnieje wiele niezależnych „sieci”, które są zgodne z protokołem bez interakcji między sobą. Możesz nawet uruchomić jedną lokalnie na własnym komputerze do testowania inteligentnych kontraktów i aplikacji web3.

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

Dwie publiczne sieci testowe, które obecnie wykorzystują programiści klientów, to Sepolia i Goerli. Sepolia to sieć dla twórców kontraktów i aplikacji przeznaczona do testowania aplikacji. Sieć Goerli pozwala programistom protokołów testować aktualizacje sieci, a stakerom testować uruchomienie walidatorów.

#### Sepolia {#sepolia}

**Sepolia jest zalecaną domyślną siecią testową do rozwoju aplikacji**. Sieć Sepolia korzysta z uprawnionego zestawu walidatorów. Jest stosunkowo nowa, co oznacza, że jej stan i historia są dość niewielkie. Oznacza to, że sieć można szybko zsynchronizować, a uruchomienie w niej węzła wymaga mniej pamięci. Jest to przydatne dla użytkowników, którzy chcą szybko uruchomić węzeł i bezpośrednio wchodzić w interakcje z siecią.

- Zamknięty zestaw walidatorów, kontrolowany przez klienta i zespoły testujące
- Nowa sieć testowa, mniej wdrożonych aplikacji niż w innych sieciach testowych
- Szybka do zsynchronizowania, a uruchomienie węzła wymaga minimalnej ilości miejsca na dysku

##### Źródła

- [Strona internetowa](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Krany

- [Kran QuickNode Sepolia](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Kran PoW](https://sepolia-faucet.pk910.de/)
- [Kran Coinbase Wallet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Kran Alchemy Sepolia](https://sepoliafaucet.com/)
- [Kran Infura Sepolia](https://www.infura.io/faucet)
- [Kran Chainstack Sepolia](https://faucet.chainstack.com/sepolia-faucet)
- [Kran Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Goerli _(wsparcie długoterminowe)_ {#goerli}

_Uwaga: [sieć testowa Goerli jest przestarzała](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) i zostanie zastąpiona przez [Holesovice](https://github.com/eth-clients/holesovice) w 2023 r. Zachęcamy do rozważenia migracji aplikacji do Sepolii._

Goerli to sieć testowa do testowania, walidacji i stakowania. Sieć Goerli jest otwarta dla użytkowników, którzy chcą uruchomić walidator sieci testowej. Stakerzy chcący przetestować aktualizacje protokołu przed jego wdrożeniem do sieci głównej powinni zatem korzystać z Goerli.

- Otwarty zestaw walidatorów, stakerzy mogą testować aktualizacje sieci
- Duży stan, przydatny do testowania złożonych interakcji inteligentnych kontraktów
- Dłuższy czas synchronizacji i wymagana większa ilość pamięci do uruchomienia węzła

##### Źródła

- [Strona internetowa](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)
- [Blockscout](https://eth-goerli.blockscout.com/)

##### Krany

- [Kran QuickNode Goerli](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Kran PoW](https://goerli-faucet.pk910.de/)
- [Kran Paradigm](https://faucet.paradigm.xyz/)
- [Kran Alchemy Goerli](https://goerlifaucet.com/)
- [Kran All That Node Goerli](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Kran Coinbase Wallet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Kran Chainstack Goerli](https://faucet.chainstack.com/goerli-faucet)

Aby uruchomić walidator w sieci testowej Goerli, użyj [launchpada „tani walidator goerli”](https://goerli.launchpad.ethstaker.cc/en/) ethstaker.

### Sieci testowe warstwy 2 {#layer-2-testnets}

[Warstwa 2 (L2)](/layer-2/) to zbiorczy termin opisujący określony zestaw rozwiązań do skalowania Ethereum. Warstwa 2 to oddzielny blockchain, który rozszerza Ethereum i dziedziczy gwarancje bezpieczeństwa Ethereum. Sieci testowe warstwy 2 są zazwyczaj ściśle powiązane z publicznymi sieciami testowymi Ethereum.

#### Arbitrum Goerli {#arbitrum-goerli}

Sieć testowa dla [Arbitrum](https://arbitrum.io/).

##### Krany

- [Kran Chainlink](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Sieć testowa dla [Optimism](https://www.optimism.io/).

##### Krany

- [Kran Paradigm](https://faucet.paradigm.xyz/)
- [Kran Coinbase Wallet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

Sieć testowa dla [Starknet](https://www.starknet.io).

##### Krany

- [Kran Starknet](https://faucet.goerli.starknet.io)

## Sieci prywatne {#private-networks}

Sieć Ethereum jest siecią prywatną, jeśli jej węzły nie są połączone z siecią publiczną (tj. sieć główna albo sieć testowa). W tym kontekście „prywatna” oznacza jedynie sieć zastrzeżoną lub odizolowaną, a nie chronioną lub bezpieczną.

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
