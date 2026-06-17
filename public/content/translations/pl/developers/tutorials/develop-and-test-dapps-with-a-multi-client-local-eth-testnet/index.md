---
title: "Jak rozwijać i testować zdecentralizowaną aplikację (dapp) w lokalnej, wieloklienckiej sieci testowej"
description: "Ten przewodnik najpierw pokaże Ci, jak utworzyć i skonfigurować wielokliencką lokalną sieć testową Ethereum, a następnie jak użyć jej do wdrożenia i przetestowania zdecentralizowanej aplikacji (dapp)."
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

Ten przewodnik przeprowadzi Cię przez proces tworzenia konfigurowalnej lokalnej sieci testowej Ethereum, wdrażania w niej inteligentnego kontraktu oraz używania tej sieci testowej do uruchamiania testów Twojej zdecentralizowanej aplikacji (dapp). Przewodnik ten jest przeznaczony dla programistów dapp, którzy chcą rozwijać i testować swoje aplikacje lokalnie w różnych konfiguracjach sieci przed wdrożeniem ich w działającej sieci testowej lub Sieci głównej.

W tym przewodniku:

- Utworzysz lokalną sieć testową Ethereum za pomocą [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) używając [Kurtosis](https://www.kurtosis.com/),
- Połączysz swoje środowisko programistyczne dapp Hardhat z lokalną siecią testową, aby skompilować, wdrożyć i przetestować zdecentralizowaną aplikację (dapp), oraz
- Skonfigurujesz lokalną sieć testową, w tym parametry takie jak liczba węzłów i konkretne pary klientów warstwy wykonawczej (EL) i warstwy konsensusu (CL), aby umożliwić procesy programistyczne i testowe w różnych konfiguracjach sieci.

### Czym jest Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) to komponowalny system budowania przeznaczony do konfigurowania wielokontenerowych środowisk testowych. W szczególności umożliwia programistom tworzenie powtarzalnych środowisk, które wymagają dynamicznej logiki konfiguracji, takich jak sieci testowe blockchain.

W tym przewodniku pakiet eth-network-package narzędzia Kurtosis uruchamia lokalną sieć testową Ethereum z obsługą klienta warstwy wykonawczej (EL) [`geth`](https://geth.ethereum.org/), a także klientów warstwy konsensusu (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) i [`lodestar`](https://lodestar.chainsafe.io/). Pakiet ten służy jako konfigurowalna i komponowalna alternatywa dla sieci w frameworkach takich jak Hardhat Network, Ganache i Anvil. Kurtosis oferuje programistom większą kontrolę i elastyczność nad używanymi przez nich sieciami testowymi, co jest głównym powodem, dla którego [Fundacja Ethereum użyła Kurtosis do testowania The Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) i nadal używa go do testowania aktualizacji sieci.

## Konfiguracja Kurtosis {#setting-up-kurtosis}

Zanim przejdziesz dalej, upewnij się, że masz:

- [Zainstalowany i uruchomiony silnik Docker](https://docs.kurtosis.com/install/#i-install--start-docker) na swojej maszynie lokalnej
- [Zainstalowany interfejs wiersza poleceń (CLI) Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (lub zaktualizowany do najnowszej wersji, jeśli masz już zainstalowane CLI)
- Zainstalowane [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) oraz [npx](https://www.npmjs.com/package/npx) (dla Twojego środowiska dapp)

## Tworzenie lokalnej sieci testowej Ethereum {#instantiate-testnet}

Aby uruchomić lokalną sieć testową Ethereum, wykonaj:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Uwaga: To polecenie nadaje Twojej sieci nazwę: „local-eth-testnet” przy użyciu flagi `--enclave`.

Kurtosis wypisze kroki, które wykonuje wewnętrznie, podczas interpretacji, walidacji, a następnie wykonywania instrukcji. Na koniec powinieneś zobaczyć wynik podobny do poniższego:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Gratulacje! Użyłeś Kurtosis do utworzenia lokalnej sieci testowej Ethereum z klientem warstwy konsensusu (CL) (`lighthouse`) i klientem warstwy wykonawczej (EL) (`geth`) za pośrednictwem narzędzia Docker.

### Podsumowanie {#review-instantiate-testnet}

W tej sekcji wykonałeś polecenie, które nakazało Kurtosis użycie [`eth-network-package` hostowanego zdalnie na GitHub](https://github.com/kurtosis-tech/eth-network-package) do uruchomienia lokalnej sieci testowej Ethereum wewnątrz [Enklawy](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Wewnątrz swojej enklawy znajdziesz zarówno „artefakty plików” (file artifacts), jak i „usługi użytkownika” (user services).

[Artefakty plików](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) w Twojej enklawie obejmują wszystkie dane wygenerowane i wykorzystane do uruchomienia klientów EL i CL. Dane te zostały utworzone przy użyciu usługi `prelaunch-data-generator` zbudowanej z tego [obrazu Docker](https://github.com/ethpandaops/ethereum-genesis-generator).

Usługi użytkownika wyświetlają wszystkie skonteneryzowane usługi działające w Twojej enklawie. Zauważysz, że utworzono pojedynczy węzeł, zawierający zarówno klienta EL, jak i klienta CL.

## Połączenie środowiska programistycznego dapp z lokalną siecią testową Ethereum {#connect-your-dapp}

### Konfiguracja środowiska programistycznego dapp {#set-up-dapp-env}

Teraz, gdy masz działającą lokalną sieć testową, możesz połączyć swoje środowisko programistyczne zdecentralizowanej aplikacji (dapp), aby z niej korzystało. W tym przewodniku użyjemy frameworka Hardhat do wdrożenia aplikacji dapp do gry w blackjacka w Twojej lokalnej sieci testowej.

Aby skonfigurować środowisko programistyczne dapp, sklonuj repozytorium zawierające naszą przykładową aplikację dapp i zainstaluj jej zależności, wykonując:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Użyty tutaj folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) zawiera typową konfigurację dla programisty dapp korzystającego z frameworka [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) zawiera kilka prostych inteligentnych kontraktów dla aplikacji dapp do gry w blackjacka
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) zawiera skrypt do wdrożenia kontraktu tokena w Twojej lokalnej sieci Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) zawiera prosty test .js dla Twojego kontraktu tokena, aby potwierdzić, że każdy gracz w naszej aplikacji dapp do gry w blackjacka ma dla siebie wybite 1000 tokenów
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje Twoje ustawienia Hardhat

### Konfiguracja Hardhat do korzystania z lokalnej sieci testowej {#configure-hardhat}

Po skonfigurowaniu środowiska programistycznego dapp, połączysz teraz Hardhat, aby korzystał z lokalnej sieci testowej Ethereum wygenerowanej przy użyciu Kurtosis. Aby to osiągnąć, zamień `<$YOUR_PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` na port z wyjścia rpc uri dowolnej usługi `el-client-<num>`. W tym przykładowym przypadku portem byłoby `64248`. Twój port będzie inny.

Przykład w `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ZAMIEŃ $YOUR_PORT NA PORT URI WĘZŁA WYGENEROWANY PRZEZ PAKIET KURTOSIS SIECI ETH

// To są klucze prywatne powiązane ze wstępnie zasilonymi kontami testowymi utworzonymi przez eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Po zapisaniu pliku Twoje środowisko programistyczne dapp Hardhat jest teraz połączone z lokalną siecią testową Ethereum! Możesz sprawdzić, czy Twoja sieć testowa działa, uruchamiając:

```python
npx hardhat balances --network localnet
```

Wynik powinien wyglądać mniej więcej tak:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Potwierdza to, że Hardhat korzysta z Twojej lokalnej sieci testowej i wykrywa wstępnie zasilone konta utworzone przez `eth-network-package`.

### Wdrażanie i testowanie aplikacji dapp lokalnie {#deploy-and-test-dapp}

Mając środowisko programistyczne dapp w pełni połączone z lokalną siecią testową Ethereum, możesz teraz uruchamiać procesy programistyczne i testowe dla swojej aplikacji dapp przy użyciu lokalnej sieci testowej.

Aby skompilować i wdrożyć inteligentny kontrakt `ChipToken.sol` do lokalnego prototypowania i rozwoju, wykonaj:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Wynik powinien wyglądać mniej więcej tak:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Teraz spróbuj uruchomić test `simple.js` w swojej lokalnej aplikacji dapp, aby potwierdzić, że każdy gracz w naszej aplikacji dapp do gry w blackjacka ma dla siebie wybite 1000 tokenów:

Wynik powinien wyglądać mniej więcej tak:

```python
npx hardhat test --network localnet
```

Wynik powinien wyglądać mniej więcej tak:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Podsumowanie {#review-dapp-workflows}

W tym momencie skonfigurowałeś już środowisko programistyczne dapp, połączyłeś je z lokalną siecią Ethereum utworzoną przez Kurtosis, a także skompilowałeś, wdrożyłeś i uruchomiłeś prosty test swojej aplikacji dapp.

Teraz sprawdźmy, jak możesz skonfigurować bazową sieć do testowania naszych aplikacji dapp w różnych konfiguracjach sieciowych.

## Konfiguracja lokalnej sieci testowej Ethereum {#configure-testnet}

### Zmiana konfiguracji klientów i liczby węzłów {#configure-client-config-and-num-nodes}

Twoja lokalna sieć testowa Ethereum może zostać skonfigurowana do korzystania z różnych par klientów EL i CL, a także różnej liczby węzłów, w zależności od scenariusza i konkretnej konfiguracji sieci, którą chcesz rozwijać lub testować. Oznacza to, że po skonfigurowaniu możesz uruchomić dostosowaną lokalną sieć testową i użyć jej do uruchamiania tych samych procesów (wdrożenie, testy itp.) w różnych konfiguracjach sieci, aby upewnić się, że wszystko działa zgodnie z oczekiwaniami. Aby dowiedzieć się więcej o innych parametrach, które możesz modyfikować, odwiedź ten link.

Spróbuj sam! Możesz przekazać różne opcje konfiguracji do `eth-network-package` za pośrednictwem pliku JSON. Ten plik JSON z parametrami sieci zawiera konkretne konfiguracje, których Kurtosis użyje do skonfigurowania lokalnej sieci Ethereum.

Weź domyślny plik konfiguracyjny i edytuj go, aby uruchomić dwa węzły z różnymi parami EL/CL:

- Węzeł 1 z `geth`/`lighthouse`
- Węzeł 2 z `geth`/`lodestar`
- Węzeł 3 z `geth`/`teku`

Ta konfiguracja tworzy heterogeniczną sieć implementacji węzłów Ethereum do testowania Twojej aplikacji dapp. Twój plik konfiguracyjny powinien teraz wyglądać tak:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Każda struktura `participants` mapuje się na węzeł w sieci, więc 3 struktury `participants` powiedzą Kurtosis, aby uruchomił 3 węzły w Twojej sieci. Każda struktura `participants` pozwoli Ci określić parę EL i CL używaną dla tego konkretnego węzła.

Struktura `network_params` konfiguruje ustawienia sieci, które są używane do tworzenia plików genesis dla każdego węzła, a także inne ustawienia, takie jak liczba sekund na slot w sieci.

Zapisz edytowany plik z parametrami w dowolnym katalogu (w poniższym przykładzie jest on zapisany na pulpicie), a następnie użyj go do uruchomienia pakietu Kurtosis, wykonując:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Uwaga: polecenie `kurtosis clean -a` jest tutaj używane, aby poinstruować Kurtosis o zniszczeniu starej sieci testowej i jej zawartości przed uruchomieniem nowej.

Ponownie, Kurtosis będzie przez chwilę pracować i wypisywać poszczególne kroki, które mają miejsce. Ostatecznie wynik powinien wyglądać mniej więcej tak:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Gratulacje! Pomyślnie skonfigurowałeś swoją lokalną sieć testową tak, aby miała 3 węzły zamiast 1. Aby uruchomić te same procesy, co wcześniej dla swojej aplikacji dapp (wdrożenie i testowanie), wykonaj te same operacje, co wcześniej, zastępując `<$YOUR_PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` portem z wyjścia rpc uri dowolnej usługi `el-client-<num>` w Twojej nowej, 3-węzłowej lokalnej sieci testowej.

## Podsumowanie {#conclusion}

I to wszystko! Podsumowując ten krótki przewodnik:

- Utworzyłeś lokalną sieć testową Ethereum za pośrednictwem narzędzia Docker przy użyciu Kurtosis
- Połączyłeś swoje lokalne środowisko programistyczne dapp z lokalną siecią Ethereum
- Wdrożyłeś zdecentralizowaną aplikację (dapp) i uruchomiłeś dla niej prosty test w lokalnej sieci Ethereum
- Skonfigurowałeś bazową sieć Ethereum tak, aby miała 3 węzły

Chętnie dowiemy się, co poszło dobrze, co można by poprawić, lub odpowiemy na wszelkie Twoje pytania. Nie wahaj się skontaktować z nami przez [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) lub [wyślij nam e-mail](mailto:feedback@kurtosistech.com)!

### Inne przykłady i przewodniki {#other-examples-guides}

Zachęcamy do zapoznania się z naszym [szybkim startem](https://docs.kurtosis.com/quickstart) (gdzie zbudujesz bazę danych Postgres i API na jej wierzchu) oraz innymi przykładami w naszym [repozytorium awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), gdzie znajdziesz świetne przykłady, w tym pakiety do:

- [Uruchamiania tej samej lokalnej sieci testowej Ethereum](https://github.com/kurtosis-tech/eth2-package), ale z podłączonymi dodatkowymi usługami, takimi jak spamer transakcji (do symulacji transakcji), monitor rozwidleń (fork monitor) oraz podłączona instancja Grafana i Prometheus
- Przeprowadzania [testu podsieci](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) w tej samej lokalnej sieci Ethereum