---
title: "Jak rozwijać i testować zdecentralizowaną aplikację (dapp) w lokalnej, wieloklienckiej sieci testowej"
description: "Ten przewodnik najpierw pokaże Ci, jak utworzyć i skonfigurować wielokliencką lokalną sieć testową Ethereum, a następnie jak użyć jej do wdrożenia i testowania zdecentralizowanej aplikacji (dapp)."
author: "Tedi Mitiku"
tags:
  [
    "klienci",
    "węzły",
    "inteligentne kontrakty",
    "komponowalność",
    "warstwa konsensusu",
    "warstwa wykonawcza",
    "testowanie",
  ]
skill: intermediate
breadcrumb: "Wielokliencka sieć testowa"
lang: pl
published: 2023-04-11
---

## Wprowadzenie {#introduction}

Ten przewodnik przeprowadzi Cię przez proces tworzenia konfigurowalnej lokalnej sieci testowej Ethereum, wdrażania w niej inteligentnego kontraktu oraz używania tej sieci testowej do uruchamiania testów Twojej zdecentralizowanej aplikacji (dapp). Przewodnik ten jest przeznaczony dla programistów dapp, którzy chcą rozwijać i testować swoje aplikacje lokalnie w różnych konfiguracjach sieci przed wdrożeniem ich w publicznej sieci testowej lub Sieci głównej.

W tym przewodniku:

- Utworzysz lokalną sieć testową Ethereum za pomocą [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) używając [Kurtosis](https://www.kurtosis.com/),
- Połączysz swoje środowisko programistyczne dapp Hardhat z lokalną siecią testową, aby skompilować, wdrożyć i przetestować dapp, oraz
- Skonfigurujesz lokalną sieć testową, w tym parametry takie jak liczba węzłów i konkretne pary klientów warstwy wykonawczej (EL) i warstwy konsensusu (CL), aby umożliwić rozwój i testowanie w różnych konfiguracjach sieci.

### Czym jest Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) to komponowalny system budowania przeznaczony do konfigurowania wielokontenerowych środowisk testowych. W szczególności umożliwia programistom tworzenie powtarzalnych środowisk, które wymagają dynamicznej logiki konfiguracji, takich jak sieci testowe blockchain.

W tym przewodniku pakiet Kurtosis `ethereum-package`, utrzymywany przez [ethPandaOps](https://ethpandaops.io/), uruchamia lokalną sieć testową Ethereum. Obsługuje on wszystkich głównych klientów warstwy wykonawczej (EL), takich jak [`geth`](https://geth.ethereum.org/), oraz klientów warstwy konsensusu (CL), takich jak [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) i [`lodestar`](https://lodestar.chainsafe.io/). Pakiet ten służy jako konfigurowalna i komponowalna alternatywa dla sieci w frameworkach takich jak Hardhat Network i Anvil. Kurtosis oferuje programistom większą kontrolę i elastyczność nad używanymi przez nich sieciami testowymi, co jest jednym z głównych powodów, dla których zespoły klientów Ethereum używają go do testowania aktualizacji sieci.

## Konfiguracja Kurtosis {#setting-up-kurtosis}

Zanim przejdziesz dalej, upewnij się, że masz:

- [Zainstalowany i uruchomiony silnik Docker](https://docs.kurtosis.com/install/#i-install--start-docker) na swoim lokalnym komputerze
- [Zainstalowany interfejs wiersza poleceń (CLI) Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (lub zaktualizowany do najnowszej wersji, jeśli masz już zainstalowane CLI)
- Zainstalowane środowisko [Node.js](https://nodejs.org/en) (dla Twojego środowiska dapp)

## Tworzenie lokalnej sieci testowej Ethereum {#instantiate-testnet}

Aby uruchomić lokalną sieć testową Ethereum, wpisz:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Uwaga: To polecenie nazywa Twoją sieć „local-eth-testnet” za pomocą flagi `--enclave`.

Kurtosis wypisze kroki, które wykonuje wewnętrznie, podczas interpretacji, walidacji, a następnie wykonywania instrukcji. Na koniec wyświetli podsumowanie utworzonej enklawy. Podsumowanie zawiera listę **artefaktów plików** (files artifacts) oraz listę **usług użytkownika** (user services). Przy domyślnej konfiguracji usługi użytkownika obejmują pojedynczy węzeł:

- `el-1-geth-lighthouse`, klient warstwy wykonawczej `geth`
- `cl-1-lighthouse-geth`, węzeł Beacon `lighthouse`
- `vc-1-geth-lighthouse`, klient walidatora `lighthouse`

Każda usługa jest wymieniona wraz z portami, które udostępnia, oraz lokalnym portem, na który każdy z nich jest zmapowany. Na przykład port `rpc` usługi `el-1-geth-lighthouse` to punkt końcowy JSON-RPC, z którego będą korzystać Twoje narzędzia dapp. Dokładne usługi i numery portów będą się różnić na Twoim komputerze.

Możesz w dowolnym momencie ponownie wyświetlić to podsumowanie, uruchamiając:

```sh
kurtosis enclave inspect local-eth-testnet
```

Gratulacje! Użyłeś Kurtosis do utworzenia lokalnej sieci testowej Ethereum z klientem CL (`lighthouse`) i EL (`geth`) za pośrednictwem platformy Docker.

### Podsumowanie {#review-instantiate-testnet}

W tej sekcji wykonałeś polecenie, które nakazało Kurtosis użycie pakietu [`ethereum-package` hostowanego zdalnie na GitHubie](https://github.com/ethpandaops/ethereum-package) do uruchomienia lokalnej sieci testowej Ethereum wewnątrz [Enklawy](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Wewnątrz swojej enklawy znajdziesz zarówno „artefakty plików”, jak i „usługi użytkownika”.

[Artefakty plików](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) w Twojej enklawie obejmują wszystkie dane wygenerowane i wykorzystane do uruchomienia klientów EL i CL, takie jak pliki genezy i klucze walidatora. Dane genezy zostały utworzone przy użyciu narzędzia [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Usługi użytkownika wyświetlają wszystkie skonteneryzowane usługi działające w Twojej enklawie. Zauważysz, że utworzono pojedynczy węzeł, zawierający zarówno klienta EL, jak i klienta CL.

## Połączenie środowiska programistycznego dapp z lokalną siecią testową Ethereum {#connect-your-dapp}

### Konfiguracja środowiska programistycznego dapp {#set-up-dapp-env}

Teraz, gdy masz działającą lokalną sieć testową, możesz połączyć swoje środowisko programistyczne dapp, aby z niej korzystało. W tym przewodniku użyjemy frameworka Hardhat do wdrożenia aplikacji dapp do gry w blackjacka w Twojej lokalnej sieci testowej.

Aby skonfigurować środowisko programistyczne dapp, sklonuj repozytorium zawierające naszą przykładową aplikację dapp i zainstaluj jej zależności, uruchamiając:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Flaga `--legacy-peer-deps` jest potrzebna, ponieważ niektóre wtyczki Hardhat w przykładowym projekcie deklarują sprzeczne wersje zależności równorzędnych (peer dependencies).

Użyty tutaj folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) zawiera typową konfigurację dla programisty dapp korzystającego z frameworka [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) zawiera kilka prostych inteligentnych kontraktów dla aplikacji dapp do gry w blackjacka
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) zawiera skrypt do wdrożenia kontraktu tokena w Twojej lokalnej sieci Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) zawiera prosty test .js dla Twojego kontraktu tokena, aby potwierdzić, że każdy gracz w naszej aplikacji dapp do blackjacka ma wyemitowane dla siebie 1000 tokenów
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje Twoje ustawienia Hardhat

### Konfiguracja Hardhat do korzystania z lokalnej sieci testowej {#configure-hardhat}

Po skonfigurowaniu środowiska programistycznego dapp, połączysz teraz Hardhat, aby korzystał z lokalnej sieci testowej Ethereum wygenerowanej za pomocą Kurtosis. Najpierw znajdź lokalny adres punktu końcowego JSON-RPC klienta warstwy wykonawczej:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Wynikiem jest adres URL, taki jak `http://127.0.0.1:32769`. Twój port będzie inny. Zastąp `<PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` tym portem.

Przykład w `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: ZAMIEŃ <PORT> NA PORT URI WĘZŁA WYGENEROWANEGO PRZEZ PAKIET KURTOSIS SIECI ETH
  // To są klucze prywatne powiązane ze wstępnie zasilonymi kontami testowymi utworzonymi przez pakiet eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Te klucze prywatne to publicznie znane klucze testowe. Nigdy nie używaj ich w Sieci głównej ani w żadnej sieci publicznej.

Po zapisaniu pliku Twoje środowisko programistyczne dapp Hardhat jest teraz połączone z lokalną siecią testową Ethereum! Możesz sprawdzić, czy Twoja sieć testowa działa, uruchamiając:

```sh
npx hardhat balances --network localnet
```

Wynik wyświetla adres i saldo każdego z powyższych kont. Na przykład pierwsza linia powinna wyglądać tak:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Potwierdza to, że Hardhat korzysta z Twojej lokalnej sieci testowej i wykrywa wstępnie zasilone konta utworzone przez pakiet `ethereum-package`.

### Wdrażanie i testowanie dapp lokalnie {#deploy-and-test-dapp}

Mając środowisko programistyczne dapp w pełni połączone z lokalną siecią testową Ethereum, możesz teraz uruchamiać procesy programistyczne i testowe dla swojej aplikacji dapp, korzystając z lokalnej sieci testowej.

Aby skompilować i wdrożyć inteligentny kontrakt `ChipToken.sol` do lokalnego prototypowania i rozwoju, uruchom:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Wynik powinien wyglądać mniej więcej tak:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Teraz spróbuj uruchomić test `ChipToken.js` na swojej lokalnej aplikacji dapp, aby potwierdzić, że każdy gracz w naszej aplikacji do blackjacka ma wyemitowane dla siebie 1000 tokenów. Przykładowy test nadal używa funkcji `deployed()` z biblioteki ethers v5, którą ethers v6 zastąpiło funkcją `waitForDeployment()`, więc najpierw zaktualizuj ją:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Następnie uruchom test:

```sh
npx hardhat test --network localnet
```

Wynik powinien wyglądać mniej więcej tak:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Podsumowanie {#review-dapp-workflows}

W tym momencie skonfigurowałeś środowisko programistyczne dapp, połączyłeś je z lokalną siecią Ethereum utworzoną przez Kurtosis, a także skompilowałeś, wdrożyłeś i uruchomiłeś prosty test swojej aplikacji dapp.

Teraz sprawdźmy, jak możesz skonfigurować bazową sieć do testowania naszych aplikacji dapp w różnych konfiguracjach sieciowych.

## Konfiguracja lokalnej sieci testowej Ethereum {#configure-testnet}

### Zmiana konfiguracji klientów i liczby węzłów {#configure-client-config-and-num-nodes}

Twoja lokalna sieć testowa Ethereum może zostać skonfigurowana do korzystania z różnych par klientów EL i CL, a także różnej liczby węzłów, w zależności od scenariusza i konkretnej konfiguracji sieci, którą chcesz rozwijać lub testować. Oznacza to, że po skonfigurowaniu możesz uruchomić dostosowaną lokalną sieć testową i używać jej do uruchamiania tych samych procesów (wdrożenie, testy itp.) w różnych konfiguracjach sieci, aby upewnić się, że wszystko działa zgodnie z oczekiwaniami. Aby dowiedzieć się więcej o innych parametrach, które możesz modyfikować, zobacz [dokumentację konfiguracji pakietu `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Spróbuj sam! Możesz przekazać różne opcje konfiguracji do pakietu `ethereum-package` za pomocą pliku YAML. Ten plik parametrów sieci zawiera konkretne konfiguracje, których Kurtosis użyje do skonfigurowania lokalnej sieci Ethereum.

Utwórz plik o nazwie `network_params.yaml`, który uruchamia trzy węzły z różnymi parami EL/CL:

- Węzeł 1 z `geth`/`lighthouse`
- Węzeł 2 z `geth`/`lodestar`
- Węzeł 3 z `geth`/`teku`

Ta konfiguracja tworzy heterogeniczną sieć implementacji węzłów Ethereum do testowania Twojej aplikacji dapp. Twój plik konfiguracyjny powinien wyglądać tak:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Każdy wpis w `participants` mapuje się na węzeł w sieci, więc 3 wpisy `participants` powiedzą Kurtosis, aby uruchomił 3 węzły w Twojej sieci. Każdy wpis pozwala określić parę EL i CL używaną dla tego konkretnego węzła. Wszelkie parametry, których nie określisz, zachowują swoje wartości domyślne.

Struktura `network_params` konfiguruje ustawienia sieci, które są używane do tworzenia plików genezy dla każdego węzła, a także inne ustawienia, takie jak liczba sekund na slot w sieci.

Zapisz swój plik parametrów, a następnie użyj go do uruchomienia pakietu Kurtosis, wpisując:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Uwaga: polecenie `kurtosis clean -a` jest tutaj używane, aby poinstruować Kurtosis o zniszczeniu starej sieci testowej i jej zawartości przed uruchomieniem nowej.

Ponownie, Kurtosis będzie przez chwilę pracować i wypisywać poszczególne kroki, które mają miejsce. Ostatecznie wyświetli podsumowanie enklawy. Tym razem usługi użytkownika obejmują trzy węzły, na przykład `el-1-geth-lighthouse`, `el-2-geth-lodestar` i `el-3-geth-teku` dla klientów warstwy wykonawczej, wraz z pasującymi klientami konsensusu i walidatora.

Gratulacje! Pomyślnie skonfigurowałeś swoją lokalną sieć testową tak, aby miała 3 węzły zamiast 1. Aby uruchomić te same procesy, co wcześniej dla swojej aplikacji dapp (wdrożenie i testowanie), wykonaj te same operacje, co wcześniej, zastępując `<PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` portem `rpc` dowolnej usługi `el-<num>-...` w Twojej nowej, 3-węzłowej lokalnej sieci testowej.

## Podsumowanie {#conclusion}

I to wszystko! Podsumowując ten krótki przewodnik:

- Utworzyłeś lokalną sieć testową Ethereum za pośrednictwem platformy Docker przy użyciu Kurtosis
- Połączyłeś swoje lokalne środowisko programistyczne dapp z lokalną siecią Ethereum
- Wdrożyłeś aplikację dapp i uruchomiłeś dla niej prosty test w lokalnej sieci Ethereum
- Skonfigurowałeś bazową sieć Ethereum tak, aby miała 3 węzły

Chętnie dowiemy się, co poszło dobrze, co można by poprawić, lub odpowiemy na wszelkie Twoje pytania. Nie wahaj się z nami skontaktować przez [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Inne przykłady i przewodniki {#other-examples-guides}

Zachęcamy do zapoznania się z naszym [przewodnikiem szybkiego startu](https://docs.kurtosis.com/quickstart) oraz innymi przykładami w naszym [repozytorium awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

Pakiet `ethereum-package` może również uruchamiać dodatkowe usługi obok Twojej sieci, takie jak spamer transakcji (do symulacji transakcji), eksplorator bloków oraz połączone instancje Grafana i Prometheus. Aby je włączyć, wymień je w sekcji `additional_services` w swoim pliku parametrów, zgodnie z opisem w [dokumentacji pakietu](https://github.com/ethpandaops/ethereum-package#configuration).
